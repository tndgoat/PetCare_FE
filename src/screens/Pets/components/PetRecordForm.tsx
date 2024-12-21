import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";

interface PetRecordFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: any;
}

interface PetRecord {
  type: string;
  name: string;
  location: string;
  date: string;
}

const PetRecordForm: React.FC<PetRecordFormProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<PetRecord>({
    type: "",
    name: "",
    location: "",
    date: "",
  });

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({ type: "", name: "", location: "", date: "" });
    onClose();
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
              <Text style={styles.backButtonText}>{"<"}</Text>
            </TouchableOpacity>
            <Text style={styles.title}>My Pets</Text>
            <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Type</Text>
              <TextInput
                style={styles.input}
                placeholder="Record type"
                value={formData.type}
                onChangeText={(text) =>
                  setFormData({ ...formData, type: text })
                }
              />
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
              <TextInput
                style={styles.input}
                placeholder="Record date"
                value={formData.date}
                onChangeText={(text) =>
                  setFormData({ ...formData, date: text })
                }
              />
            </View>
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
    padding: 8,
  },
  backButtonText: {
    fontSize: 18,
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
});

export default PetRecordForm;
