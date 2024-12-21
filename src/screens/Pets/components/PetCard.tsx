import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export interface PetProps {
  id: string;
  name: string;
  type: string;
  age: string;
  gender: string;
  status: string;
  imageUrl: string;
}

const PetCard: React.FC<{ pet: PetProps }> = ({ pet }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.petCard}
      activeOpacity={0.7}
      // onPress={() => navigation.navigate("PetProfileScreen", { petId: pet.id })}
    >
      <Image
        source={{ uri: pet.imageUrl }}
        style={styles.petImage}
        defaultSource={require("../../../assets/pet-placholder2.png")}
      />
      <View style={styles.petInfo}>
        <Text style={styles.petName}>{pet.name}</Text>
        <Text style={styles.petDetail}>{pet.type}</Text>
        <Text style={styles.petDetail}>{pet.age}</Text>
        <Text style={styles.petDetail}>
          {pet.gender}
          {pet.status ? `, ${pet.status}` : ""}
        </Text>
      </View>
      <TouchableOpacity style={styles.arrowButton}>
        <MaterialIcons name="arrow-right" size={25} color="#ffffff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerButton: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
    paddingTop: 20,
  },
  petCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fef2f2",
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    marginHorizontal: 16,
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  petInfo: {
    flex: 1,
    marginLeft: 12,
  },
  petName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  petDetail: {
    fontSize: 14,
    color: "#4b5563",
  },
  arrowButton: {
    backgroundColor: "#a46770",
    width: 25,
    height: 25,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    marginTop: 30,
  },
});

export default PetCard;
