import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Pressable,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";

interface PetRecord {
  _id?: string;
  type: string;
  name: string;
  location: string;
  timeStamp: string;
  petId: string;
}

enum RecordType {
  VACCINATION = "vaccination",
  NEUTERING = "neutering",
  SURGERY = "surgery",
  DIAGNOSIS = "diagnosis",
  DENTAL = "dental",
  OTHER = "other",
}

interface PetRecordFormProps {
  visible: boolean;
  onClose: () => void;
  petId: string;
  mode: "add" | "update";
  record?: PetRecord;
  onSuccess: () => void;
}

const API_URL = "https://petcare-sdbq.onrender.com/api/v1/records";

const PetRecordForm: React.FC<PetRecordFormProps> = ({
  visible,
  onClose,
  petId,
  mode,
  record,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<Partial<PetRecord>>({
    type: RecordType.VACCINATION,
    name: "",
    location: "",
    timeStamp: new Date().toISOString(),
    petId: petId,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (mode === "update" && record) {
      setFormData({
        _id: record._id,
        type: record.type,
        name: record.name,
        location: record.location,
        timeStamp: record.timeStamp,
        petId: record.petId,
      });
      setDate(new Date(record.timeStamp));
    }
  }, [mode, record]);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      setFormData({ ...formData, timeStamp: selectedDate.toISOString() });
    }
  };

  const handleSubmit = async () => {
    try {
      const headers = {
        Accept: "*/*",
        Authorization: `Bearer ${await AsyncStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      };

      let response: any;
      if (mode === "add") {
        response = await axios.post(API_URL, formData, { headers });
      } else {
        response = await axios.patch(API_URL, formData, { headers });
      }

      if (response.status < 200 || response.status >= 300) {
        throw new Error("Network response was not ok");
      }

      setFormData({
        type: "other",
        name: "",
        location: "",
        timeStamp: new Date().toISOString(),
        petId: petId,
      });
      onClose();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      onSuccess();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>
              {mode === "add" ? "Add Pet Record" : "Update Pet Record"}
            </Text>
            <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
              <Text style={styles.addButtonText}>
                {mode === "add" ? "Add" : "Update"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Type</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.type}
                  onValueChange={(itemValue) =>
                    setFormData({ ...formData, type: itemValue })
                  }
                  style={styles.picker}
                >
                  <Picker.Item
                    label="Vaccination"
                    value={RecordType.VACCINATION}
                  />
                  <Picker.Item label="Neutering" value={RecordType.NEUTERING} />
                  <Picker.Item label="Surgery" value={RecordType.SURGERY} />
                  <Picker.Item label="Diagnosis" value={RecordType.DIAGNOSIS} />
                  <Picker.Item label="Dental" value={RecordType.DENTAL} />
                  <Picker.Item label="Other" value={RecordType.OTHER} />
                </Picker>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Record name"
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Location</Text>
              <TextInput
                style={styles.input}
                placeholder="Record location"
                value={formData.location}
                onChangeText={(text) =>
                  setFormData({ ...formData, location: text })
                }
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Date</Text>
              <Pressable onPress={() => setShowDatePicker(true)}>
                <View style={styles.input}>
                  <Text>{date.toLocaleDateString()}</Text>
                </View>
              </Pressable>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    fontSize: 16,
    padding: 8,
  },
  backButtonText: {
    fontSize: 14,
    color: "#000",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  addButton: {
    padding: 8,
  },
  addButtonText: {
    fontSize: 16,
    color: "#ff69b4",
  },
  form: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#ff69b4",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    width: "100%",
  },
});

export default PetRecordForm;
