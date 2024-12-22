import React from 'react'
import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import PetCard, { PetProps } from '../../components/Pets/PetCard'
import { useNavigation } from '@react-navigation/native'

const SAMPLE_PETS: PetProps[] = [
  {
    id: '1',
    name: 'Bob the crying cat',
    type: 'Tuxedo Cat',
    age: '2 years old',
    gender: 'Male',
    status: 'unmedicated',
    imageUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '2',
    name: 'Mr. Golden 9999',
    type: 'Shiba Inu Dog',
    age: '4 years old',
    gender: 'Male',
    status: 'neutered',
    imageUrl: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8',
  },
  {
    id: '3',
    name: "Bob's Snack",
    type: 'Hamster',
    age: '20 weeks old',
    gender: 'Male',
    status: '',
    imageUrl: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQzfHx8ZW58MHx8fHx8',
  },
]

const PetListScreen: React.FC = () => {
  const navigation = useNavigation<any>()
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {SAMPLE_PETS.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
        <TouchableOpacity activeOpacity={0.7} style={styles.addButton} onPress={() => navigation.navigate('AddPet')}>
          <Text style={styles.addButtonText}>Add Pet</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  scrollView: {
    flex: 1,
    paddingTop: 20,
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    margin: 'auto',
    justifyContent: 'center',
    width: '90%',
    padding: 10,
    marginVertical: 16,
    borderColor: 'pink',
    borderWidth: 1,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
  },
})

export default PetListScreen
