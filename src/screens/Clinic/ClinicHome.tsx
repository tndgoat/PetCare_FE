import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, Image, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Clinic {
  id: string
  name: string
  address: string
  distance: string
  rating: number
  image: string
}

const services = [
  { id: '1', icon: '🏥', name: 'General', route: 'General' },
  { id: '2', icon: '🔪', name: 'Surgery', route: 'Surgery' },
  { id: '3', icon: '🦷', name: 'Dental', route: 'Dental' },
  { id: '4', icon: '🛁', name: 'Pet Spa', route: 'PetSpa' },
  { id: '5', icon: '✂️', name: 'Neutering', route: 'Neutering' },
  { id: '6', icon: '💉', name: 'Vaccinate', route: 'Vaccinate' },
  { id: '7', icon: '🔬', name: 'Diagnose', route: 'Diagnose' },
]

const recommendedClinics: Clinic[] = [
  {
    id: '1',
    name: 'BK Vet Clinic',
    address: '267 Ly Thuong Kiet St., Dist.10, HCMC',
    distance: '600m away',
    rating: 4.7,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9eLOzNJ9VhtmO7cnxF6o8oHhFgVMcTJVR8A&s',
  },
]

const recentClinics: Clinic[] = [
  {
    id: '1',
    name: 'RK Vet',
    address: 'District 1, HCMC',
    distance: '1.2km away',
    rating: 4.5,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9eLOzNJ9VhtmO7cnxF6o8oHhFgVMcTJVR8A&s',
  },
  {
    id: '2',
    name: 'HCM Pet',
    address: 'District 3, HCMC',
    distance: '800m away',
    rating: 4.8,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI5Slnub8ialSOqiAi67ZGZeESPLnCjmAkAA&s',
  },
  {
    id: '3',
    name: 'House of Pet',
    address: 'District 2, HCMC',
    distance: '2.5km away',
    rating: 4.6,
    image: 'https://media.istockphoto.com/id/1225898954/vector/medical-clinic-building-simple-flat-illustration.jpg?s=612x612&w=0&k=20&c=JklgLCtm5NpwE5i6yN0JTIqp7vPlA7YB3RPYNIUHXlQ=',
  },
  {
    id: '4',
    name: 'House of Pet',
    address: 'District 2, HCMC',
    distance: '2.5km away',
    rating: 4.6,
    image: 'https://media.istockphoto.com/id/1225898954/vector/medical-clinic-building-simple-flat-illustration.jpg?s=612x612&w=0&k=20&c=JklgLCtm5NpwE5i6yN0JTIqp7vPlA7YB3RPYNIUHXlQ=',
  },
]

const ClinicHome = () => {
  const navigation = useNavigation<any>()

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Find a clinic" placeholderTextColor="#666" />
        </View>

        <Text style={styles.sectionTitle}>Services</Text>
        <View style={styles.servicesGrid}>
          {services.map((service) => (
            <TouchableOpacity key={service.id} style={styles.serviceItem}>
              <Text style={styles.serviceIcon}>{service.icon}</Text>
              <Text style={styles.serviceName}>{service.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Recommended Clinics</Text>
        {recommendedClinics.map((clinic) => (
          <TouchableOpacity key={clinic.id} style={styles.clinicCard} onPress={() => navigation.navigate('ClinicDetail', { clinicData: clinic })}>
            <Image source={{ uri: clinic.image }} style={styles.clinicImage} />
            <View style={styles.clinicInfo}>
              <Text style={styles.clinicName}>{clinic.name}</Text>
              <Text style={styles.clinicAddress}>{clinic.address}</Text>
              <View style={styles.clinicMeta}>
                <Text style={styles.clinicRating}>⭐ {clinic.rating}</Text>
                <Text style={styles.clinicDistance}>{clinic.distance}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Your Recent Clinics</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.recentClinicsScroll}>
          {recentClinics.map((clinic) => (
            <TouchableOpacity key={clinic.id} style={styles.recentClinicCard} onPress={() => navigation.navigate('ClinicDetail', { clinicData: clinic })}>
              <Image source={{ uri: clinic.image }} style={styles.recentClinicImage} />
              <Text style={styles.recentClinicName}>{clinic.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  backButton: {
    fontSize: 16,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ff4081',
  },
  searchContainer: {
    padding: 16,
    marginTop: 10,
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 16,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  serviceItem: {
    width: '25%',
    padding: 8,
    alignItems: 'center',
  },
  serviceIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  serviceName: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
  },
  clinicCard: {
    flexDirection: 'row',
    padding: 16,
    borderWidth: 1,
    margin: 16,
    borderColor: '#eee',
    borderRadius: 10,
  },
  clinicImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  clinicInfo: {
    flex: 1,
  },
  clinicName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  clinicAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  clinicMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  clinicRating: {
    fontSize: 14,
    color: '#666',
  },
  clinicDistance: {
    fontSize: 14,
    color: '#666',
  },
  recentClinicsScroll: {
    paddingHorizontal: 8,
  },
  recentClinicCard: {
    padding: 8,
    alignItems: 'center',
    width: 90,
  },
  recentClinicImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  recentClinicName: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
  },
})

export default ClinicHome
