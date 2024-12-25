import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import PetCard from "../../components/Pets/PetCard";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface PetProps {
  _id: string;
  name: string;
  gender: "male" | "female";
  type: "dog" | "cat"; // Assuming only dog or cat for now, adjust as needed
  avatar: string;
  weight: number;
  isNeutered: boolean;
  breed: string;
  userId: string;
  birthday: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  __v: number;
}

const PetListScreen: React.FC = ({ refetch }: any) => {
  const navigation = useNavigation<any>();
  const [pets, setPets] = useState<PetProps[]>();

  // API call to fetch user info
  const fetchUserPets = async () => {
    try {
      const response = await axios.get(
        "https://petcare-sdbq.onrender.com/api/v1/pets",
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem(
              "access_token"
            )}`,
          },
        }
      );
      setPets(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserPets();
  }, [refetch]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.addButton}
        onPress={() => navigation.navigate("AddPet")}
      >
        <Text style={styles.addButtonText}>Add Pet</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        {pets?.reverse()?.map((pet: PetProps) => (
          <PetCard key={pet._id} pet={pet} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
  },
  scrollView: {
    flex: 1,
    paddingTop: 20,
    marginBottom: 10,
  },
  addButton: {
    display: "flex",
    padding: 10,
    marginVertical: 16,
    borderColor: "pink",
    position: "absolute",
    top: -65,
    right: 10,
    zIndex: 100,
  },
  addButtonText: {
    color: "#333",
    fontSize: 16,
    textAlign: "center",
  },
});

export default PetListScreen;
