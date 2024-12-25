import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import { Linking } from "react-native";

type PostCategory = "moment" | "knowledge" | "lostpet";

interface CreatePostModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (postData: any) => void;
}

const API_URL = "https://petcare-sdbq.onrender.com/api/v1";

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<PostCategory>("knowledge");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    content: "",
    description: "",
    location: "",
    phoneNo: "",
    fbLink: "",
    title: "",
  });

  const categories = [
    { id: "knowledge" as PostCategory, label: "Knowledge" },
    { id: "moment" as PostCategory, label: "Moment" },
    { id: "lostpet" as PostCategory, label: "Lost pet" },
  ];

  const uploadImageToServer = async (imageUri: string) => {
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: imageUri,
        type: "image/jpeg",
        name: "upload.jpg",
      });

      const token = await AsyncStorage.getItem("access_token");
      const response = await axios.post(`${API_URL}/medias/upload`, formData, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.result;
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error", "Failed to upload image");
      return null;
    }
  };

  const pickImage = async (mode: "camera" | "gallery") => {
    try {
      const permission =
        mode === "camera"
          ? await ImagePicker.requestCameraPermissionsAsync()
          : await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          `Please allow access to your ${
            mode === "camera" ? "camera" : "photo library"
          }`
        );
        return;
      }

      const result =
        mode === "camera"
          ? await ImagePicker.launchCameraAsync({
              cameraType: ImagePicker.CameraType.back,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            })
          : await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });

      if (!result.canceled) {
        setSelectedImage(
          "https://img.freepik.com/premium-vector/loading-icon-vector-editable-element-design-template-file-format-eps_609989-2243.jpg"
        );
        const uploadedUrl = await uploadImageToServer(result.assets[0].uri);

        if (uploadedUrl) {
          setSelectedImage(uploadedUrl);
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const postData = {
        type: category,
        content: formData.content || "",
        title: formData.title || formData.content || "",
        description: formData.description || formData.content || "",
        location: formData.location || "",
        fbLink: formData.fbLink || "fbLink.com",
        image:
          selectedImage ||
          "https://images.unsplash.com/photo-1516366434321-728a48e6b7bf",
        phoneNo: formData.phoneNo || "",
      };

      console.log(JSON.stringify(postData, null, 2));

      await axios.post(`${API_URL}/posts`, postData, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${await AsyncStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      });

      onSubmit(postData);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
      Alert.alert("Error", "Failed to create post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      content: "",
      description: "",
      location: "",
      phoneNo: "",
      fbLink: "",
      title: "",
    });
    setSelectedImage(null);
    setCategory("knowledge");
  };



  const renderImagePicker = () => (
    <View style={styles.imageUploadBox}>
      <TouchableOpacity
        style={styles.imagePickerContainer}
        onPress={() => pickImage("gallery")}
      >
        {selectedImage ? (
          <Image
            source={{ uri: selectedImage }}
            style={styles.imagePlaceholder}
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Icon name="image-outline" size={40} color="#666" />
            <Text style={styles.uploadText}>Tap to upload image</Text>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cameraButton}
        onPress={() => pickImage("camera")}
      >
        <Icon name="camera" size={24} color="#FF69B4" />
      </TouchableOpacity>
    </View>
  );

  const renderRegularPostForm = () => (
    <View style={styles.formContainer}>
      {renderImagePicker()}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.descriptionInput}
        placeholder="What is going on?"
        multiline
        value={formData.content}
        onChangeText={(text) => setFormData({ ...formData, content: text })}
      />
    </View>
  );

  const renderLostPetForm = () => (
    <View style={styles.formContainer}>
      {renderImagePicker()}

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.descriptionInput}
        multiline
        value={formData.description}
        onChangeText={(text) => setFormData({ ...formData, description: text })}
      />

      <Text style={styles.label}>Lost location</Text>
      <TextInput
        style={styles.input}
        value={formData.location}
        onChangeText={(text) => setFormData({ ...formData, location: text })}
      />

      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>Phone number</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            value={formData.phoneNo}
            onChangeText={(text) => setFormData({ ...formData, phoneNo: text })}
          />
        </View>

        <View style={styles.halfWidth}>
          <Text style={styles.label}>Facebook link</Text>
          <TextInput
            style={styles.input}
            keyboardType="url"
            value={formData.fbLink}
            onChangeText={(text) => setFormData({ ...formData, fbLink: text })}
          />
        </View>
      </View>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create a post</Text>
        </View>
        <ScrollView
          style={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.categorySelector}>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Text style={styles.selectedCategory}>
                {categories.find((cat) => cat.id === category)?.label}
              </Text>
              <Text style={styles.dropdownIcon}>▼</Text>
            </TouchableOpacity>

            {isDropdownOpen && (
              <View style={styles.dropdown}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setCategory(cat.id);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        category === cat.id && styles.dropdownItemActive,
                      ]}
                    >
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {category === "lostpet"
            ? renderLostPetForm()
            : renderRegularPostForm()}
        </ScrollView>

        <TouchableOpacity
          style={[
            styles.postButton,
            !formData.content &&
              !formData.description &&
              styles.postButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!formData.content && !formData.description}
        >
          <Text style={styles.postButtonText}>
            {isLoading ? "Posting..." : "Post"}
          </Text>
        </TouchableOpacity>

        <View style={styles.bottomPadding} />
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  closeButton: {
    fontSize: 16,
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    color: "#ff4081",
    fontWeight: "600",
  },
  postButton: {
    backgroundColor: "#ff4081",
    paddingVertical: 12,
    minWidth: "92%",
    paddingHorizontal: 20, // Thêm padding ngang
    borderRadius: 8,
    alignSelf: "center", // Thay thế marginHorizontal: "auto"
    marginVertical: 10, // Thay thế marginTop và marginBottom
  },
  bottomPadding: {
    height: 10,
  },
  postButtonDisabled: {
    backgroundColor: "#ff4081",
    opacity: 0.6, // Thêm opacity để thể hiện trạng thái disabled
  },
  postButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  categorySelector: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    zIndex: 1,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 7,
    borderWidth: 1,
    borderColor: "#ff4081",
    borderRadius: 10,
    width: 120,
  },
  selectedCategory: {
    flex: 1,
    color: "#ff4081",
  },
  dropdownIcon: {
    color: "#ff4081",
    fontSize: 12,
  },
  dropdown: {
    position: "absolute",
    top: 60,
    left: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
    width: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownItem: {
    padding: 12,
  },
  dropdownItemText: {
    color: "#666",
  },
  dropdownItemActive: {
    color: "#ff4081",
    fontWeight: "600",
  },
  formContainer: {
    padding: 16,
  },
  contentInput: {
    height: 150,
    textAlignVertical: "top",
    padding: 10,
    borderRadius: 10,
    borderColor: "#ffc2d6",
    borderWidth: 1,
  },
  imageUploadBox: {
    height: 200,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 16,
    marginBottom: 8,
    color: "#ff4081",
  },
  descriptionInput: {
    height: 100,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    padding: 8,
    textAlignVertical: "top",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    padding: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  halfWidth: {
    width: "48%",
  },
  keyboard: {
    height: 280,
    backgroundColor: "#d1d5db",
    marginTop: "auto",
  },
  imagePickerContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    marginBottom: 24,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadText: {
    marginTop: 8,
    color: "#666",
  },
  cameraButton: {
    position: "absolute",
    top: -18,
    right: -8,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default CreatePostModal;
