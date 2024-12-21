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
} from "react-native";

type PostCategory = "moments" | "knowledge" | "lost_pet";

interface CreatePostModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (postData: any) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
}) => {
  const [category, setCategory] = useState<PostCategory>("knowledge");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    content: "",
    description: "",
    lostLocation: "",
    phoneNumber: "",
    facebookLink: "",
  });

  const categories = [
    { id: "knowledge" as PostCategory, label: "Knowledge" },
    { id: "moments" as PostCategory, label: "Moments" },
    { id: "lost_pet" as PostCategory, label: "Lost pet" },
  ];

  const handleSubmit = () => {
    onSubmit({
      category,
      ...formData,
    });
    onClose();
  };

  const renderRegularPostForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.imageUploadBox}>
        <TouchableOpacity style={styles.imagePickerContainer}>
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={styles.imagePlaceholder}
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Image
                source={require("../../../../assets/image-placeholder.jpeg")}
                style={styles.imagePlaceholder}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.contentInput}
        placeholder="What is going on?"
        multiline
        value={formData.content}
        onChangeText={(text) => setFormData({ ...formData, content: text })}
      />
    </View>
  );

  const renderLostPetForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.imageUploadBox}>
        <TouchableOpacity style={styles.imagePickerContainer}>
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={styles.imagePlaceholder}
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Image
                source={require("../../../../assets/image-placeholder.jpeg")}
                style={styles.imagePlaceholder}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>

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
        value={formData.lostLocation}
        onChangeText={(text) =>
          setFormData({ ...formData, lostLocation: text })
        }
      />

      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>Phone number</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            value={formData.phoneNumber}
            onChangeText={(text) =>
              setFormData({ ...formData, phoneNumber: text })
            }
          />
        </View>

        <View style={styles.halfWidth}>
          <Text style={styles.label}>Facebook link</Text>
          <TextInput
            style={styles.input}
            keyboardType="url"
            value={formData.facebookLink}
            onChangeText={(text) =>
              setFormData({ ...formData, facebookLink: text })
            }
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
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create a post</Text>
        </View>

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

        {category === "lost_pet"
          ? renderLostPetForm()
          : renderRegularPostForm()}

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
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    fontSize: 14,
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    color: "#ff4081",
    fontWeight: "600",
  },
  postButton: {
    backgroundColor: "#ff4081",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    width: "92%",
    marginHorizontal: "auto",
  },
  postButtonDisabled: {
    backgroundColor: "#ffa4c4",
    marginHorizontal: "auto",
  },
  postButtonText: {
    color: "#fff",
    marginHorizontal: "auto",
    fontWeight: "600",
    width: "100%",
    textAlign: "center",
    padding: 6,
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
    marginTop: 20,
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
  },
  descriptionInput: {
    height: 80,
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
});

export default CreatePostModal;
