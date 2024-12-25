import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native'
import PaymentSuccessModal from './components/PaymentSuccessModal'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AppointmentBooking = ({ route, navigation }) => {
  const { clinicData } = route.params
  const [modalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const preparePayload = (clinicData) => {
    return {
      name: clinicData.name || 'HCM Pet Joy',
      address: clinicData.address || '460 Le Hong Phong, W2, D5, HCMC',
      phone: clinicData.phone || '0123456789',
      email: clinicData.email || 'example@gmail.com',
      rating: clinicData.rating || 4.7,
      image: clinicData.image || 'https://example.com/image.jpg',
      description: clinicData.description || 'Lorem ipsum dolor sit amet...',
      priceList: clinicData.priceList || [
        {
          name: 'Vaccination',
          price: 100000,
        },
      ],
      serviceTags: clinicData.serviceTags || ['vaccination', 'diagnosis'],
      distanceAway: parseFloat(clinicData.distance) || 800, // Chuyển đổi sang số
      openTime: clinicData.openTime || '08:00',
      closeTime: clinicData.closeTime || '18:00',
    }
  }

  const handleBookAppointment = async () => {
    try {
      setLoading(true)

      const token = await AsyncStorage.getItem('access_token')
      if (!token) {
        throw new Error('Missing access token')
      }

      const payload = preparePayload(clinicData)

      console.log('Payload:', JSON.stringify(payload)) // Log để kiểm tra payload

      const response = await fetch('https://petcare-sdbq.onrender.com/api/v1/clinic', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorDetail = await response.json()
        console.error('Error response from API:', errorDetail)
        throw new Error(`HTTP error! Status: ${response.status}, Detail: ${JSON.stringify(errorDetail)}`)
      }

      return true // Thành công
    } catch (error) {
      console.error('Error booking appointment:', error)
      return false // Thất bại
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.clinicInfo}>
        <Image source={{ uri: clinicData.image }} style={styles.clinicImage} />
        <View style={styles.clinicDetails}>
          <Text style={styles.clinicName}>HCM Pet Joy</Text>
          <Text style={styles.clinicAddress}>460 Le Hong Phong, W2, D5, HCMC</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ 4.7</Text>
            <Text style={styles.distance}>800m away</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Date</Text>
          <TouchableOpacity>
            <Text style={styles.changeButton}>Change</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateIcon}>🗓️</Text>
          <Text style={styles.dateText}>Wednesday, Dec 26, 2025 | 13:30 AM</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Reason</Text>
          <TouchableOpacity>
            <Text style={styles.changeButton}>Change</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.reasonContainer}>
          <Text style={styles.reasonIcon}>✏️</Text>
          <Text style={styles.reasonText}>Cat Neutering</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Detail</Text>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Consultation</Text>
          <Text style={styles.paymentAmount}>$59.00</Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Additional Discount</Text>
          <Text style={styles.paymentAmount}>$14.00</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>$45.00</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <TouchableOpacity>
            <Text style={styles.changeButton}>Change</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.paymentMethod}>
          <Text style={styles.visaText}>VISA</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.footerLabel}>Total</Text>
          <Text style={styles.footerAmount}>$ 45.00</Text>
        </View>
        <TouchableOpacity
          style={styles.bookingButton}
          onPress={async () => {
            const success = await handleBookAppointment()
            if (success) {
              setModalVisible(true) // Show success modal if booking succeeded
            } else {
              Alert.alert('Error', 'Failed to book appointment. Please try again later.')
            }
          }}
        >
          <Text style={styles.bookingButtonText}>Booking</Text>
        </TouchableOpacity>
      </View>

      <PaymentSuccessModal visible={modalVisible} onClose={() => setModalVisible(false)} navigation={navigation} />
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
    padding: 16,
  },
  backButton: {
    fontSize: 24,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  clinicInfo: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  clinicImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  clinicDetails: {
    flex: 1,
  },
  clinicName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  clinicAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  changeButton: {
    color: '#666',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  dateText: {
    fontSize: 16,
  },
  reasonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reasonIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  reasonText: {
    fontSize: 16,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  paymentLabel: {
    color: '#666',
  },
  paymentAmount: {
    color: '#666',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontWeight: '600',
  },
  totalAmount: {
    color: '#e91e63',
    fontWeight: '600',
  },
  paymentMethod: {
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  visaText: {
    fontWeight: '600',
  },
  footer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalContainer: {
    flex: 1,
  },
  footerLabel: {
    color: '#666',
    marginBottom: 4,
  },
  footerAmount: {
    fontSize: 18,
    fontWeight: '600',
  },
  bookingButton: {
    backgroundColor: '#e91e63',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginLeft: 16,
  },
  bookingButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})

export default AppointmentBooking
