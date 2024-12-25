// PetDetailScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from "react-native";
import PetRecordForm from "../../components/Pets/PetRecordForm";
import { PetProps } from "./PetListScreen";
import { calculateMonthsPassed, formatDate } from "../../helper/formatDate";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RecordType =
  | "vaccination"
  | "neutering"
  | "surgery"
  | "diagnosis"
  | "dental"
  | "other";

export interface PetRecord {
  _id: string;
  type: RecordType;
  name: string;
  location: string;
  timeStamp: string;
  petId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const PetDetailScreen: React.FC = ({ route }: any) => {
  const [activeTab, setActiveTab] = useState("Essentials");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [pet, setPet] = useState<PetProps>(route.params.petData);
  const [records, setRecords] = useState<PetRecord[]>();
  const [mode, setMode] = useState<"add" | "update">("add");
  const [recordToUpdate, setRecordToUpdate] = useState<PetRecord>();

  const getPetRecords = async () => {
    try {
      const response = await axios.get(
        `https://petcare-sdbq.onrender.com/api/v1/records/pets/${pet._id}`,
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem(
              "access_token"
            )}`,
          },
        }
      );
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const deleteRecord = async (recordId: string) => {
    try {
      const response = await axios.delete(
        `https://petcare-sdbq.onrender.com/api/v1/records/${recordId}`,
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem(
              "access_token"
            )}`,
          },
        }
      );
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      getPetRecords();
    }
  };
  useEffect(() => {
    if (activeTab === "Records") getPetRecords();
  }, [activeTab]);

  const renderTabs = () => (
    <View style={styles.tabContainer}>
      {["Essentials", "Records"].map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => setActiveTab(tab)}
        >
          <Text
            style={[styles.tabText, activeTab === tab && styles.activeTabText]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderInfo = () => (
    <View style={styles.infoContainer}>
      {[
        { label: "Birthday", value: formatDate(pet.birthday), icon: "🎂" },
        { label: "Neutered", value: pet.isNeutered ? "Yes" : "No", icon: "💉" },
        { label: "Weight", value: `${pet.weight} Kg`, icon: "⚖️" },
        { label: "Breed", value: pet.breed, icon: "🐾" },
      ].map((item, index) => (
        <View key={index} style={styles.infoRow}>
          <Text style={styles.infoIcon}>{item.icon}</Text>
          <Text style={styles.infoLabel}>{item.label}</Text>
          <Text style={styles.infoValue}>{item.value}</Text>
        </View>
      ))}
      <View style={styles.infoDescription}>
        <View style={styles.infoDescLabel}>
          <Text style={styles.infoIcon}>📝</Text>
          <Text style={styles.infoLabel}>Description</Text>
        </View>
        <Text style={styles.infoValue}>
          {pet.description ||
            "Max là một chú chó cực kỳ thân thiện và đáng yêu. Với bộ lông mượt mà và đôi mắt sáng long lanh, cậu ấy luôn là trung tâm của sự chú ý trong mỗi buổi đi dạo."}
        </Text>
      </View>
    </View>
  );

  const renderRecords = () => (
    <View style={styles.recordContainer}>
      {records?.length > 0 &&
        records?.map((record, index) => (
          <View key={index} style={styles.recordItem}>
            <View style={styles.recordHeader}>
              <Text style={styles.recordType}>{record.name}</Text>
              <Text style={styles.recordDate}>
                {formatDate(record.timeStamp)}
              </Text>
            </View>
            <Text style={styles.recordSubType}>{record.type}</Text>
            <Text style={styles.recordLocation}>{record.location}</Text>
            <View style={styles.recordActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => deleteRecord(record._id)}
              >
                <Text style={styles.cancelButtonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  setIsFormVisible(true);
                  setMode("update");
                  setRecordToUpdate(record);
                }}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      <TouchableOpacity
        style={styles.addRecordButton}
        onPress={() => {
          setIsFormVisible(true);
          setMode("add");
        }}
      >
        <Text>+</Text>
        <Text style={styles.addRecordText}>New record</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                pet.avatar ||
                "https://cdn-icons-png.flaticon.com/512/4823/4823463.png",
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.petInfo}>
          <Text style={styles.petName}>
            {pet.name} {pet.gender === "male" ? "♂️" : "♀️"}
          </Text>
          <Text style={styles.petAge}>
            {calculateMonthsPassed(pet.birthday)} months
          </Text>
        </View>
        {renderTabs()}
        {activeTab === "Essentials" && renderInfo()}
        {activeTab === "Records" && renderRecords()}
      </ScrollView>

      <PetRecordForm
        visible={isFormVisible}
        onClose={() => setIsFormVisible(false)}
        petId={pet?._id}
        mode={mode}
        record={recordToUpdate}
        onSuccess={() => getPetRecords()}
      />
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    padding: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  petInfo: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  petName: {
    fontSize: 22,
    fontWeight: "600",
    color: "#FF69B4",
    marginBottom: 4,
  },
  petAge: {
    fontSize: 16,
    color: "#666",
    marginLeft: 10,
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginTop: 6,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#FF69B4",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    color: "#FF69B4",
    fontWeight: "600",
  },
  infoContainer: {
    padding: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoDescription: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },
  infoDescLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  infoLabel: {
    flex: 1,
    fontSize: 16,
  },
  infoValue: {
    fontSize: 16,
    color: "#666",
  },
  recordContainer: {
    padding: 16,
  },
  recordItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  recordType: {
    fontSize: 16,
    fontWeight: "600",
  },
  recordDate: {
    fontSize: 14,
    color: "#666",
  },
  recordSubType: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  recordLocation: {
    fontSize: 14,
    color: "#666",
  },
  recordActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    gap: 8,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#FF69B4",
  },
  cancelButtonText: {
    color: "#FF69B4",
  },
  editButton: {
    backgroundColor: "#FF69B4",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  editButtonText: {
    color: "#fff",
  },
  addRecordButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  addRecordText: {
    fontSize: 16,
    marginLeft: 8,
  },
});

export default PetDetailScreen;
