import React, { useState } from "react";
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
} from "react-native";
import * as ImagePicker from "react-native-image-picker";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-native-date-picker";

// Types
type PetType = "Cat" | "Dog" | "Other";
type Gender = "Male" | "Female";

interface PetFormData {
  name: string;
  birthday: string;
  breed: string;
  type: PetType;
  gender: Gender;
  isNeutered: boolean;
  weight: string;
  description: string;
  image?: string;
}

// Validation Schema
const petFormSchema = yup.object().shape({
  name: yup.string().required("Pet name is required"),
  birthday: yup.string().required("Birthday is required"),
  breed: yup.string().required("Breed is required"),
  type: yup.string().required("Pet type is required"),
  gender: yup.string().required("Gender is required"),
  isNeutered: yup.boolean().required("Please select neutered status"),
  weight: yup
    .string()
    .required("Weight is required")
    .matches(/^\d*\.?\d*$/, "Weight must be a number"),
  description: yup.string(),
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

const AddPetScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PetFormData>({
    resolver: yupResolver<any>(petFormSchema),
    defaultValues: {
      type: "Cat",
      gender: "Male",
      isNeutered: false,
    },
  });

  // const pickImage = async () => {
  //   const result = await ImagePicker.launchImageLibrary({
  //     mediaType: "photo",
  //     quality: 1,
  //   });

  //   if (result.assets && result.assets[0]?.uri) {
  //     setSelectedImage(result.assets[0].uri);
  //     setValue("image", result.assets[0].uri);
  //   }
  // };

  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const onSubmit = async (data: PetFormData) => {
    console.log(JSON.stringify(data, null, 2));
    // try {
    //   setIsLoading(true);
    //   // Create FormData for image upload
    //   const formData = new FormData();
    //   Object.keys(data).forEach((key) => {
    //     if (key === "image" && selectedImage) {
    //       formData.append("image", {
    //         uri: selectedImage,
    //         type: "image/jpeg",
    //         name: "pet-image.jpg",
    //       });
    //     } else {
    //       formData.append(key, data[key as keyof PetFormData]);
    //     }
    //   });
    //   // Example API call
    //   // const response = await fetch('YOUR_API_ENDPOINT', {
    //   //   method: 'POST',
    //   //   body: formData,
    //   //   headers: {
    //   //     'Content-Type': 'multipart/form-data',
    //   //   },
    //   // });
    //   // Simulate API call
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
    //   Alert.alert("Success", "Pet added successfully!");
    //   // Navigation.goBack(); // Add your navigation logic
    // } catch (error) {
    //   Alert.alert("Error", "Failed to add pet. Please try again.");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <TouchableOpacity
          style={styles.imagePickerContainer}
          // onPress={pickImage}
        >
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={styles.imagePlaceholder}
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Image
                source={{
                  uri: "https://cpworldgroup.com/wp-content/uploads/2021/01/placeholder.png",
                }}
                style={styles.imagePlaceholder}
              />
            </View>
          )}
        </TouchableOpacity>

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
              <TouchableOpacity
                style={[styles.input, styles.birthdayInput]}
                onPress={() => setDatePickerOpen(true)}
              >
                <Text style={value ? styles.dateText : styles.placeholderText}>
                  {value || "Select birthday"}
                </Text>
                <Text style={styles.birthdayIcon}>📅</Text>
              </TouchableOpacity>
              {errors.birthday && (
                <Text style={styles.errorText}>{errors.birthday.message}</Text>
              )}
              <DatePicker
                modal
                open={datePickerOpen}
                date={value ? new Date(value) : new Date()}
                mode="date"
                maximumDate={new Date()}
                onConfirm={(date) => {
                  setDatePickerOpen(false);
                  onChange(formatDate(date));
                }}
                onCancel={() => {
                  setDatePickerOpen(false);
                }}
              />
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
                {(["Cat", "Dog", "Other"] as PetType[]).map((type) => (
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
                {(["Male", "Female"] as Gender[]).map((gender) => (
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

        <Controller
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
        />

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
            <Text style={styles.submitButtonText}>Add Pet</Text>
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
  },
  content: {
    padding: 16,
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
  description: {
    height: 100,
    textAlignVertical: "top",
  },
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

export default AddPetScreen;
