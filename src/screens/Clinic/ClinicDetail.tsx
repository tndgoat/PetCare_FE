import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ClinicDetail = ({ route }) => {
  const [selectedDate, setSelectedDate] = useState('25')
  const [selectedTime, setSelectedTime] = useState('09:30 AM')
  const { clinicData } = route.params
  const navigation = useNavigation<any>()

  const dates = [
    { day: 'Mon', date: '23' },
    { day: 'Tue', date: '24' },
    { day: 'Wed', date: '25' },
    { day: 'Thu', date: '26' },
    { day: 'Fri', date: '27' },
    { day: 'Sat', date: '28' },
    { day: 'Sun', date: '29' },
  ]

  const times = ['08:00 AM', '09:30 AM', '11:00 AM', '13:30 PM', '15:00 PM', '16:30 PM']

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image
          source={{
            uri: clinicData.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS56vmX-2s7V78X4eCF-EfVCSOZF0emVj9f3g&s',
          }}
          style={styles.clinicImage}
        />

        <View style={styles.clinicInfo}>
          <Text style={styles.clinicName}>HCM Pet Joy</Text>
          <Text style={styles.clinicAddress}>460 Le Hong Phong, W2, D5, HCMC</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ 4.7</Text>
            <Text style={styles.distance}>800m away</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...</Text>
          <TouchableOpacity>
            <Text style={styles.readMore}>Read more</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service</Text>
          <TouchableOpacity style={styles.serviceButton}>
            <Text style={styles.serviceName}>Cat Neutering</Text>
            <Text>›</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal style={styles.dateScroll}>
          {dates.map((item) => (
            <TouchableOpacity key={item.date + item.day} style={[styles.dateButton, selectedDate === item.date && styles.selectedDateButton]} onPress={() => setSelectedDate(item.date)}>
              <Text style={styles.dayText}>{item.day}</Text>
              <Text style={[styles.dateText, selectedDate === item.date && styles.selectedDateText]}>{item.date}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.timeGrid}>
          {times.map((time) => (
            <TouchableOpacity key={time} style={[styles.timeButton, selectedTime === time && styles.selectedTimeButton]} onPress={() => setSelectedTime(time)}>
              <Text style={[styles.timeText, selectedTime === time && styles.selectedTimeText]}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('ClinicAppoinment', { clinicData })}>
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  clinicImage: {
    width: '100%',
    height: 200,
    objectFit: 'contain',
  },
  clinicInfo: {
    padding: 16,
  },
  clinicName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  clinicAddress: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
  },
  rating: {
    marginRight: 16,
    color: '#666',
  },
  distance: {
    color: '#666',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  aboutText: {
    color: '#666',
    lineHeight: 20,
  },
  readMore: {
    color: '#e91e63',
    marginTop: 8,
  },
  serviceButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  serviceName: {
    fontSize: 16,
  },
  dateScroll: {
    padding: 16,
  },
  dateButton: {
    alignItems: 'center',
    marginRight: 16,
    padding: 8,
    width: 50,
  },
  selectedDateButton: {
    backgroundColor: '#e91e63',
    borderRadius: 8,
  },
  dayText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
  },
  selectedDateText: {
    color: '#fff',
  },
  timeGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: 16,
    gap: 18,
    alignContent: 'center',
  },
  timeButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e91e63',
  },
  selectedTimeButton: {
    backgroundColor: '#e91e63',
  },
  timeText: {
    color: '#e91e63',
  },
  selectedTimeText: {
    color: '#fff',
  },
  bookButton: {
    margin: 26,
    marginTop: 10,
    backgroundColor: '#e91e63',
    padding: 16,
    borderRadius: 18,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})

export default ClinicDetail
