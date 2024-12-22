// PetDetailScreen.tsx
import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import PetRecordForm from '../../components/Pets/PetRecordForm'

interface PetRecord {
  type: string
  subType: string
  date: string
  location: string
}
// types.ts
interface PetProfileProps {
  name: string
  age: string
  gender: 'male' | 'female'
  birthday: string
  neutered: boolean
  weight: string
  breed: string
  description: string
  imageUrl: string
  records: PetRecord[]
}

const dummy_pet_data: PetProfileProps = {
  name: 'Bob the crying cat',
  age: '2 Years 2 Months',
  gender: 'male',
  birthday: '12 Dec 2020',
  neutered: false,
  weight: '6.5 Kg',
  breed: 'Tuxedo Cat',
  description: 'Allergies bản records thì mk bỏ đi nhé, tại mk muốn chỗ record đó sẽ được tự động cập nhật khi mà mình bấm',
  imageUrl: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQzfHx8ZW58MHx8fHx8',
  records: [
    {
      type: 'Vaccination',
      subType: 'Canine Distemper',
      date: '08/09/2021',
      location: 'BK Vet Clinic',
    },
  ],
}

const PetDetailScreen: React.FC = ({ route }: any) => {
  const [activeTab, setActiveTab] = useState('Essentials')
  const [pet, setPet] = useState(dummy_pet_data)
  const { petData } = route.params
  const [isFormVisible, setIsFormVisible] = useState(false)

  useEffect(() => {
    setPet((prev) => ({ ...prev, ...petData }))
  }, [])

  const handleSubmit = (record: PetRecord) => {
    console.log('New pet record:', record)
    // Handle the submission here
  }

  const renderTabs = () => (
    <View style={styles.tabContainer}>
      {['Essentials', 'Records'].map((tab) => (
        <TouchableOpacity key={tab} style={[styles.tab, activeTab === tab && styles.activeTab]} onPress={() => setActiveTab(tab)}>
          <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )

  const renderInfo = () => (
    <View style={styles.infoContainer}>
      {[
        { label: 'Birthday', value: pet.birthday, icon: '🎂' },
        { label: 'Neutered', value: pet.neutered ? 'Yes' : 'No', icon: '💉' },
        { label: 'Weight', value: pet.weight, icon: '⚖️' },
        { label: 'Breed', value: pet.breed, icon: '🐾' },
        // { label: "Description", value: pet.description, icon: "📝" },
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
        <Text style={styles.infoValue}>{pet.description}</Text>
      </View>
    </View>
  )

  const renderRecords = () => (
    <View style={styles.recordContainer}>
      {pet.records.map((record, index) => (
        <View key={index} style={styles.recordItem}>
          <View style={styles.recordHeader}>
            <Text style={styles.recordType}>{record.type}</Text>
            <Text style={styles.recordDate}>{record.date}</Text>
          </View>
          <Text style={styles.recordSubType}>{record.subType}</Text>
          <Text style={styles.recordLocation}>{record.location}</Text>
          <View style={styles.recordActions}>
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <TouchableOpacity style={styles.addRecordButton} onPress={() => setIsFormVisible(true)}>
        <Text>+</Text>
        <Text style={styles.addRecordText}>New record</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={{ uri: pet.imageUrl }} style={styles.image} resizeMode="cover" />
        </View>
        <View style={styles.petInfo}>
          <Text style={styles.petName}>
            {pet.name} {pet.gender === 'male' ? '♂️' : '♀️'}
          </Text>
          <Text style={styles.petAge}>{pet.age}</Text>
        </View>
        {renderTabs()}
        {activeTab === 'Essentials' && renderInfo()}
        {activeTab === 'Records' && renderRecords()}
      </ScrollView>
      <PetRecordForm visible={isFormVisible} onClose={() => setIsFormVisible(false)} onSubmit={handleSubmit} />
    </SafeAreaView>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  petInfo: {
    alignItems: 'center',
    marginTop: 8,
  },
  petName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FF69B4',
    marginBottom: 4,
  },
  petAge: {
    fontSize: 16,
    color: '#666',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginTop: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF69B4',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#FF69B4',
    fontWeight: '600',
  },
  infoContainer: {
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoDescription: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30,
    gap: 10,
  },
  infoDescLabel: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: '#666',
  },
  recordContainer: {
    padding: 16,
  },
  recordItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  recordType: {
    fontSize: 16,
    fontWeight: '600',
  },
  recordDate: {
    fontSize: 14,
    color: '#666',
  },
  recordSubType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  recordLocation: {
    fontSize: 14,
    color: '#666',
  },
  recordActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    gap: 8,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FF69B4',
  },
  cancelButtonText: {
    color: '#FF69B4',
  },
  editButton: {
    backgroundColor: '#FF69B4',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  editButtonText: {
    color: '#fff',
  },
  addRecordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  addRecordText: {
    fontSize: 16,
    marginLeft: 8,
  },
})

export default PetDetailScreen
