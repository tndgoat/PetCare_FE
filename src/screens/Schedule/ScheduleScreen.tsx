import React, { useState } from 'react'
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import Entypo from '@expo/vector-icons/Entypo'
import ScheduleModal from './components/ScheduleModal'

const ScheduleScreen = () => {
  const [filter, setFilter] = useState('All')
  const [isModalVisible, setModalVisible] = useState(false)

  const data = [
    {
      title: 'Take Golden for a walk',
      type: 'Routine',
      avatar: require('../../images/golden.png'),
      time: '04:30 PM',
      details: 'Mr. Golden',
      recurrence: 'Everyday',
    },
    {
      title: 'Feed Bob',
      type: 'Routine',
      avatar: require('../../images/bob.png'),
      time: '02:00 PM',
      details: 'Bob',
      recurrence: 'Everyday',
    },
    {
      title: 'Bob’s neutering',
      type: 'Appointment',
      avatar: require('../../images/bob.png'),
      time: '6:00 PM',
      details: 'Bob',
      recurrence: 'Tomorrow',
      location: 'BK Vet Clinic',
    },
  ]

  const filteredData = filter === 'All' ? data : data.filter((item) => item.type === filter)

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.fixedHeaderContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{'Schedule'}</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.headerIcon}>{'+'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterContainer}>
          <TouchableOpacity style={[styles.filterButton, filter === 'All' && styles.activeFilterButton]} onPress={() => setFilter('All')}>
            <Text style={styles.filterButtonText}>{'All'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterButton, filter === 'Routine' && styles.activeFilterButton]} onPress={() => setFilter('Routine')}>
            <Text style={styles.filterButtonText}>{'Routine'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterButton, filter === 'Appointment' && styles.activeFilterButton]} onPress={() => setFilter('Appointment')}>
            <Text style={styles.filterButtonText}>{'Appointment'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {filteredData.map((item, index) => (
          <View key={index} style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderTextContainer}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.cardSubtitle}>{item.type}</Text>
                  {item.location && (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Entypo name="location-pin" size={16} color="black" style={{ marginLeft: 10 }} />
                      <Text style={styles.cardDetailText}>{item.location}</Text>
                    </View>
                  )}
                </View>
              </View>
              <Image source={item.avatar} resizeMode="stretch" style={styles.cardImage} />
            </View>

            <View style={styles.cardDetailsRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AntDesign name="calendar" size={12} color="#555555" />
                <Text style={[styles.cardDetailText, { marginLeft: 1 }]}>{item.recurrence}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AntDesign name="clockcircleo" size={12} color="black" />
                <Text style={[styles.cardDetailText, { marginLeft: 2 }]}>{item.time}</Text>
              </View>

              <Entypo name="dot-single" size={24} color="#7BEB78" />
              <Text style={styles.cardDetailText}>{item.details}</Text>
            </View>
            <View style={styles.cardActionsRow}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => alert('Pressed!')}>
                <Text style={styles.cancelButtonText}>{'Cancel'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rescheduleButton} onPress={item.type === 'Appointment' ? () => alert('Pressed!') : () => setModalVisible(true)}>
                <Text style={styles.rescheduleButtonText}>{item.type === 'Appointment' ? 'Complete' : 'Reschedule'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <ScheduleModal isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  fixedHeaderContainer: {
    backgroundColor: '#FFFFFF',
    paddingTop: 85,
    paddingHorizontal: 35,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 35,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 29,
  },
  headerTitle: {
    color: '#101623',
    fontSize: 24,
    marginRight: 4,
    flex: 1,
  },
  headerIcon: {
    color: '#000000',
    fontSize: 36,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3E8ED',
    borderRadius: 8,
    paddingRight: 15,
    marginBottom: 25,
  },
  filterButton: {
    width: 0.27 * Dimensions.get('window').width,
    alignItems: 'center',
    backgroundColor: '#F3E8ED',
    borderRadius: 8,
    paddingVertical: 18,
  },
  activeFilterButton: {
    backgroundColor: '#DB3169',
  },
  filterButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  filterText: {
    color: '#101623',
    fontSize: 14,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: '#F3E8ED',
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 25,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 27,
  },
  cardHeaderTextContainer: {
    flex: 1,
    marginRight: 4,
  },
  cardTitle: {
    color: '#101623',
    fontSize: 18,
    marginBottom: 8,
  },
  cardSubtitle: {
    color: '#ADADAD',
    fontSize: 12,
  },
  cardImage: {
    width: 49,
    height: 49,
  },
  cardDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconSmall: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  iconTiny: {
    width: 6,
    height: 6,
    marginRight: 6,
  },
  cardDetailText: {
    color: '#555555',
    fontSize: 12,
    marginRight: 30,
  },
  cardActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancelButton: {
    width: '45%',
    alignItems: 'center',
    backgroundColor: '#F3E8ED',
    borderRadius: 8,
    paddingVertical: 18,
  },
  cancelButtonText: {
    color: '#555555',
    fontSize: 14,
  },
  rescheduleButton: {
    width: '45%',
    alignItems: 'center',
    backgroundColor: '#DB3169',
    borderRadius: 8,
    paddingVertical: 18,
  },
  rescheduleButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 28,
  },
  footerIcon: {
    marginRight: 10,
  },
})

export default ScheduleScreen
