// App.tsx
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { PetProps } from "../Pets/PetListScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface Pet {
  id: string;
  name: string;
  imageUrl: string;
  type: string;
}

interface Appointment {
  id: string;
  title: string;
  time: string;
  date: string;
  clinic: string;
}

interface Reminder {
  id: string;
  title: string;
  time: string;
  date: string;
  icon: string;
}

const appointments: Appointment[] = [
  {
    id: "1",
    title: "Bob's Neutering: The reason he's crying...",
    time: "14:30",
    date: "09/13/2024",
    clinic: "BK Vet Clinic",
  },
  {
    id: "2",
    title: "Bob's Snack Neutering: The reason he's crying...",
    time: "1:30",
    date: "01/12/2024",
    clinic: "BK Vet Clinic",
  },
];

const reminders: Reminder[] = [
  {
    id: "1",
    title: "Take Golden for a walk",
    time: "16:30",
    date: "09/13/2024",
    icon: "🚶‍♂️",
  },
];

const HomeScreen = ({ refetch }: any) => {
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
      <ScrollView style={styles.scrollView}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>
              Love your pet{"\n"}with endless care.
            </Text>
            <TouchableOpacity>
              <Text style={styles.notificationIcon}>🔔</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search vet clinics, articles..."
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Rating Card */}
        <View style={styles.ratingCard}>
          <View style={styles.ratingContent}>
            <View>
              <Text style={styles.ratingTitle}>Enjoy our app?</Text>
              <Text style={styles.ratingSubtitle}>Give us a rate!</Text>
              <TouchableOpacity style={styles.rateButton}>
                <Text style={styles.rateButtonText}>Rate us now</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={require("../../images/Enjoy-Image.png")}
              style={styles.ratingImage}
            />
          </View>
        </View>

        {/* Pets Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Pets</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Pets")}>
              <Text style={styles.seeAllButton}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.petsScrollContainer}
          >
            {pets?.map((pet) => (
              <TouchableOpacity
                key={pet._id}
                style={styles.petCard}
                onPress={() =>
                  navigation.navigate("PetProfileScreen", { petData: pet })
                }
              >
                <Image
                  source={{
                    uri: pet.avatar,
                  }}
                  style={styles.petImage}
                />
                <Text style={styles.petName}>{pet.name}</Text>
                <Text style={styles.petType}>{pet.type}</Text>
                <TouchableOpacity>
                  <Text style={styles.moreOptions}>...</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Appointments Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllButton}>See all</Text>
            </TouchableOpacity>
          </View>
          {appointments.map((appointment) => (
            <View key={appointment.id} style={styles.appointmentCard}>
              <Text style={styles.appointmentIcon}>⛔</Text>
              <View style={styles.appointmentInfo}>
                <Text style={styles.appointmentTitle}>{appointment.title}</Text>
                <Text style={styles.appointmentDetails}>
                  {appointment.time} · {appointment.date} · {appointment.clinic}
                </Text>
              </View>
              <View style={styles.appointmentActions}>
                <TouchableOpacity style={styles.cancelButton}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.completeButton}>
                  <Text style={styles.completeButtonText}>Complete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Reminders Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Reminders</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllButton}>See all</Text>
            </TouchableOpacity>
          </View>
          {reminders.map((reminder) => (
            <View key={reminder.id} style={styles.reminderCard}>
              <Text style={styles.reminderIcon}>{reminder.icon}</Text>
              <View style={styles.reminderInfo}>
                <Text style={styles.reminderTitle}>{reminder.title}</Text>
                <Text style={styles.reminderDetails}>
                  {reminder.time} · {reminder.date}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 32,
  },
  notificationIcon: {
    fontSize: 20,
  },
  searchContainer: {
    marginTop: 8,
  },
  searchInput: {
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 12,
    fontSize: 14,
  },
  ratingCard: {
    backgroundColor: "#FFF0F3",
    borderRadius: 16,
    padding: 20,
    margin: 20,
    marginTop: 0,
  },
  ratingContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  ratingSubtitle: {
    fontSize: 14,
    marginBottom: 12,
  },
  rateButton: {
    backgroundColor: "#FF4D6D",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  rateButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  ratingImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAllButton: {
    color: "#FF4D6D",
  },
  petsScrollContainer: {
    paddingRight: 20,
  },
  petCard: {
    alignItems: "center",
    marginRight: 16,
    width: 110,
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  petName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  petType: {
    fontSize: 12,
    color: "#666666",
  },
  moreOptions: {
    fontSize: 20,
    color: "#666666",
  },
  appointmentCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    marginBottom: 12,
  },
  appointmentIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  appointmentDetails: {
    fontSize: 12,
    color: "#666666",
  },
  appointmentActions: {
    marginLeft: 10,
    flexDirection: "column-reverse",
    gap: 8,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "#FF4D6D",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  cancelButtonText: {
    color: "#FF4D6D",
    textAlign: "center",
  },
  completeButton: {
    backgroundColor: "#FF4D6D",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  completeButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  reminderCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    marginBottom: 12,
  },
  reminderIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  reminderInfo: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  reminderDetails: {
    fontSize: 12,
    color: "#666666",
  },
});

export default HomeScreen;
