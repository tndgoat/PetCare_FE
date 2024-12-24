import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

// Types
type PetType = "cat" | "dog" | "other";
type Gender = "male" | "female";

interface PetFormData {
  name: string;
  birthday: string;
  breed: string;
  type: PetType;
  gender: Gender;
  isNeutered: boolean;
  weight: string;
  // description?: string;
  avatar?: string;
  age: number;
}

interface PetFormProps {
  mode: "add" | "update";
  initialData?: PetFormData;
  setRefetch: any;
}

const API_URL = "https://petcare-sdbq.onrender.com/api/v1/pets";

// Validation Schema
const petFormSchema = yup.object().shape({
  name: yup.string().required("Pet name is required"),
  birthday: yup.string().required("Birthday is required"),
  breed: yup.string().required("Breed is required"),
  type: yup
    .string()
    .oneOf(["cat", "dog", "other"] as const, "Invalid pet type")
    .required("Pet type is required"),
  gender: yup
    .string()
    .oneOf(["male", "female"] as const, "Invalid gender")
    .required("Gender is required"),
  isNeutered: yup.boolean().required("Please select neutered status"),
  weight: yup
    .string()
    .required("Weight is required")
    .matches(/^\d*\.?\d*$/, "Weight must be a number"),
  // description: yup.string().optional(),
  avatar: yup.string().optional(),
});

// Radio Button Component
const RadioButton: React.FC<{
  selected: boolean;
  label: string;
  onPress: () => void;
}> = ({ selected, label, onPress }) => (
  <TouchableOpacity style={styles.radioOption} onPress={onPress}>
    <View style={styles.radio}>
      {selected && <View style={styles.radioSelected} />}
    </View>
    <Text style={styles.radioLabel}>{label}</Text>
  </TouchableOpacity>
);

// Component starts here
const PetForm: React.FC<PetFormProps> = ({
  mode = "add",
  initialData,
  setRefetch,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    initialData?.avatar || null
  );
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation<any>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<PetFormData>({
    resolver: yupResolver<any>(petFormSchema),
    defaultValues: {
      type: "cat",
      gender: "male",
      isNeutered: false,
      ...initialData,
    },
  });

  useEffect(() => {
    if (mode === "update" && initialData) {
      reset(initialData);
      setSelectedImage(initialData.avatar);
    }
  }, [mode, initialData]);

  const uploadImageToServer = async (imageUri: string) => {
    try {
      const formData = new FormData();

      formData.append("image", {
        uri: imageUri,
        type: "image/jpeg",
        name: "upload.jpg",
      });

      const response = await fetch(
        "https://petcare-sdbq.onrender.com/api/v1/medias/upload",
        {
          method: "POST",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${await AsyncStorage.getItem(
              "access_token"
            )}`,
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }

      return data.result;
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error", "Failed to upload image");
      return null;
    }
  };

  const pickImage = async (mode: string) => {
    try {
      // Request permission
      const permission =
        mode === "camera"
          ? await ImagePicker.requestCameraPermissionsAsync()
          : await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission) {
        Alert.alert(
          "Permission Required",
          "Please allow access to your photo library"
        );
        return;
      }

      // Launch image library
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
          setValue("avatar", uploadedUrl);
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const calculateAge = (birthday: string): number => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const onSubmit = async (data: PetFormData) => {
    try {
      setIsLoading(true);
      const age = calculateAge(data.birthday);
      const payload = {
        ...data,
        age,
        weight: Number(data.weight),
        avatar:
          data.avatar ||
          "https://images.unsplash.com/photo-1516366434321-728a48e6b7bf?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      };

      const response = await fetch(API_URL, {
        method: mode === "add" ? "POST" : "PATCH",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${await AsyncStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Something went wrong");
      }

      navigation.navigate("PetListScreen");
      setRefetch();
    } catch (error) {
      console.error("Error:", error);
      Alert.alert(
        "Error",
        error instanceof Error
          ? error.message
          : `Failed to ${mode} pet. Please try again.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
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
              <Text>Tap to select image</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.cameraContainer}>
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={() => pickImage("camera")}
          >
            <Icon name="camera" size={24} color="#FF69B4" />
          </TouchableOpacity>
        </View>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Pet Name</Text>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                value={value}
                onChangeText={onChange}
                placeholder="Your pet name"
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name.message}</Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="birthday"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Birthday</Text>
              <Pressable
                style={[styles.input, errors.birthday && styles.inputError]}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={value ? styles.dateText : styles.placeholderText}>
                  {value
                    ? new Date(value).toLocaleDateString()
                    : "Select birthday"}
                </Text>
              </Pressable>
              {errors.birthday && (
                <Text style={styles.errorText}>{errors.birthday.message}</Text>
              )}
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      setDate(selectedDate);
                      onChange(selectedDate.toISOString());
                      setValue("age", calculateAge(selectedDate.toISOString()));
                    }
                  }}
                />
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Pet Type</Text>
              <View style={styles.radioGroup}>
                {(["cat", "dog", "other"] as PetType[]).map((type) => (
                  <RadioButton
                    key={type}
                    selected={value === type}
                    label={type}
                    onPress={() => onChange(type)}
                  />
                ))}
              </View>
              {errors.type && (
                <Text style={styles.errorText}>{errors.type.message}</Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.radioGroup}>
                {(["male", "female"] as Gender[]).map((gender) => (
                  <RadioButton
                    key={gender}
                    selected={value === gender}
                    label={gender}
                    onPress={() => onChange(gender)}
                  />
                ))}
              </View>
              {errors.gender && (
                <Text style={styles.errorText}>{errors.gender.message}</Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="isNeutered"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Is Neutered</Text>
              <View style={styles.radioGroup}>
                {[
                  { value: true, label: "Yes" },
                  { value: false, label: "No" },
                ].map((option) => (
                  <RadioButton
                    key={option.label}
                    selected={value === option.value}
                    label={option.label}
                    onPress={() => onChange(option.value)}
                  />
                ))}
              </View>
            </View>
          )}
        />

        <Controller
          control={control}
          name="breed"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Breed</Text>
              <TextInput
                style={[styles.input, errors.breed && styles.inputError]}
                value={value}
                onChangeText={onChange}
                placeholder="Enter breed"
              />
              {errors.breed && (
                <Text style={styles.errorText}>{errors.breed.message}</Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="weight"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Weight (kg)</Text>
              <TextInput
                style={[styles.input, errors.weight && styles.inputError]}
                value={value}
                onChangeText={onChange}
                placeholder="Enter weight"
                keyboardType="numeric"
              />
              {errors.weight && (
                <Text style={styles.errorText}>{errors.weight.message}</Text>
              )}
            </View>
          )}
        />

        {/* <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.description]}
                value={value}
                onChangeText={onChange}
                placeholder="Describe your pet"
                multiline
                numberOfLines={4}
              />
            </View>
          )}
        /> */}

        <TouchableOpacity
          style={[
            styles.submitButton,
            isLoading && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>
              {mode === "add" ? "Add Pet" : "Update Pet"}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  content: {
    padding: 16,
  },
  cameraContainer: {
    position: "absolute",
    top: -10,
    right: -5,
    zIndex: 100,
  },
  cameraButton: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#FF69B4",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: "#FF0000",
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
    marginTop: 4,
  },
  birthdayIcon: {
    position: "absolute",
    right: 12,
  },
  radioGroup: {
    flexDirection: "row",
    marginTop: 8,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FF69B4",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FF69B4",
  },
  radioLabel: {
    fontSize: 16,
    color: "#333",
  },
  // description: {
  //   height: 100,
  //   textAlignVertical: "top",
  // },
  submitButton: {
    backgroundColor: "#FF69B4",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 40,
  },
  submitButtonDisabled: {
    backgroundColor: "#FFB6C1",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  dateText: {
    fontSize: 16,
    color: "#000",
  },
  placeholderText: {
    fontSize: 16,
    color: "#999",
  },
  birthdayInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
});

export default PetForm;
