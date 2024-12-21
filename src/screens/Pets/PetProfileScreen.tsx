// PetDetailScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from "react-native";

const PetDetailScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Essentials");

  // types.ts
  interface PetProfileProps {
    name: string;
    age: string;
    gender: "male" | "female";
    birthday: string;
    neutered: boolean;
    weight: string;
    breed: string;
    description: string;
    image: string;
  }

  const pet: PetProfileProps = {
    name: "Bob the crying cat",
    age: "2 Years 2 Months",
    gender: "male",
    birthday: "12 Dec 2020",
    neutered: false,
    weight: "6.5 Kg",
    breed: "Tuxedo Cat",
    description:
      "Allergies bản records thì mk bỏ đi nhé, tại mk muốn chỗ record đó sẽ được tự động cập nhật khi mà mình bấm",
    image: "https://example.com/pet-image.jpg",
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity>
        <Text>{"<"}</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>My Pets</Text>
      <TouchableOpacity>
        <Text style={styles.headerButton}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

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
        { label: "Birthday", value: pet.birthday, icon: "🎂" },
        { label: "Neutered", value: pet.neutered ? "Yes" : "No", icon: "💉" },
        { label: "Weight", value: pet.weight, icon: "⚖️" },
        { label: "Breed", value: pet.breed, icon: "🐾" },
        { label: "Description", value: pet.description, icon: "📝" },
      ].map((item, index) => (
        <View key={index} style={styles.infoRow}>
          <Text style={styles.infoIcon}>{item.icon}</Text>
          <Text style={styles.infoLabel}>{item.label}</Text>
          <Text style={styles.infoValue}>{item.value}</Text>
        </View>
      ))}
    </View>
  );

  const renderBottomNav = () => (
    <View style={styles.bottomNav}>
      {[
        { icon: "🏠", label: "Home" },
        { icon: "📋", label: "Records" },
        { icon: "👣", label: "Activities" },
        { icon: "📅", label: "Calendar" },
        { icon: "👤", label: "Profile" },
      ].map((item, index) => (
        <TouchableOpacity key={index} style={styles.navItem}>
          <Text style={styles.navIcon}>{item.icon}</Text>
          <Text style={[styles.navText, index === 0 && styles.activeNavText]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: pet.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.petInfo}>
          <Text style={styles.petName}>
            {pet.name} {pet.gender === "male" ? "♂️" : "♀️"}
          </Text>
          <Text style={styles.petAge}>{pet.age}</Text>
        </View>
        {renderTabs()}
        {activeTab === "Essentials" && renderInfo()}
      </ScrollView>
      {renderBottomNav()}
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  headerButton: {
    fontSize: 16,
    color: "#007AFF",
  },
  imageContainer: {
    padding: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  petInfo: {
    alignItems: "center",
    marginTop: 8,
  },
  petName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FF69B4",
    marginBottom: 4,
  },
  petAge: {
    fontSize: 16,
    color: "#666",
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginTop: 16,
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
  bottomNav: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingBottom: 34,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: "#666",
  },
  activeNavText: {
    color: "#FF69B4",
  },
});

export default PetDetailScreen;
