import React, { useState } from 'react'
import { Modal, View, Text, TextInput, TouchableOpacity, Dimensions, ScrollView, StyleSheet } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Dropdown } from 'react-native-element-dropdown'
import DateTimePicker from '@react-native-community/datetimepicker'

const data1 = [
  { label: 'Bob the Crying Cat', value: 'pet1' },
  { label: 'Mr. Golden', value: 'pet2' },
  { label: 'Bob’s Snack', value: 'pet3' },
]

const data2 = [
  { label: 'Routine', value: 'Routine' },
  { label: 'Appointment', value: 'Appointment' },
  { label: 'Other', value: 'Other' },
]

const ScheduleModal = ({ isModalVisible, setModalVisible }) => {
  const { width, height } = Dimensions.get('window')
  const [titleInput, onChangeTitleInput] = useState('')
  const [value1, setValue1] = useState(data1[0].value)
  const [value2, setValue2] = useState(data2[0].value)
  const [selectedDateOption, setSelectedDateOption] = useState('Everyday')
  const [showDate, setShowDate] = useState(false)
  const [showTime, setShowTime] = useState(false)
  const [date, setDate] = useState(new Date())

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShowTime(false)
    setDate(currentDate)
  }

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShowDate(false)
    setDate(currentDate)
  }

  const renderItem = (item, selectedValue, iconName) => {
    return (
      <View style={styles.item}>
        {item.value === selectedValue && <MaterialIcons style={styles.icon} name={iconName} size={24} color="#DB3169" />}
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    )
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <Modal visible={isModalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { width: width * 0.75, height: height * 0.75 }]}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.headerText}>{'Set up new schedule'}</Text>

            <Text style={styles.labelText}>{'For whom?'}</Text>
            <Dropdown
              style={styles.dropdown}
              data={data1}
              labelField="label"
              valueField="value"
              placeholder="Select pet"
              value={value1}
              onChange={(item) => setValue1(item.value)}
              renderItem={(item) => renderItem(item, value1, 'pets')}
            />

            <Text style={styles.labelText}>{'Title'}</Text>
            <TextInput placeholder={'Write a fascinating title'} value={titleInput} onChangeText={onChangeTitleInput} style={styles.textInput} />

            <Text style={styles.labelText}>{'Type of schedule'}</Text>
            <Dropdown
              style={styles.dropdown}
              data={data2}
              labelField="label"
              valueField="value"
              placeholder="Select schedule type"
              value={value2}
              onChange={(item) => setValue2(item.value)}
              renderItem={(item) => renderItem(item, value2, 'edit-calendar')}
            />

            <Text style={styles.labelText}>{'Date'}</Text>
            <View style={styles.dateButtonContainer}>
              <TouchableOpacity style={selectedDateOption === 'Specific' ? styles.selectedButton : styles.unselectedButton} onPress={() => setSelectedDateOption('Specific')}>
                <Text style={selectedDateOption === 'Specific' ? styles.selectedButtonText : styles.unselectedButtonText}>{'Specific'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={selectedDateOption === 'Everyday' ? styles.selectedButton : styles.unselectedButton} onPress={() => setSelectedDateOption('Everyday')}>
                <Text style={selectedDateOption === 'Everyday' ? styles.selectedButtonText : styles.unselectedButtonText}>{'Everyday'}</Text>
              </TouchableOpacity>
            </View>

            {selectedDateOption === 'Specific' && (
              <View style={styles.rowContainer}>
                <TouchableOpacity style={styles.centeredButton} onPress={() => setShowDate(true)}>
                  <Text style={styles.buttonText}>Select Date</Text>
                </TouchableOpacity>
                {showDate && <DateTimePicker testID="datePicker" value={date} mode="date" display="default" onChange={onChangeDate} />}
                <Text style={styles.selectedValue}>{formatDate(date)}</Text>
              </View>
            )}

            <Text style={styles.labelText}>{'Time'}</Text>
            <View style={styles.rowContainer}>
              <TouchableOpacity style={styles.centeredButton} onPress={() => setShowTime(true)}>
                <Text style={styles.buttonText}>Select Time</Text>
              </TouchableOpacity>
              {showTime && <DateTimePicker testID="dateTimePicker" value={date} mode="time" is24Hour={false} display="spinner" onChange={onChangeTime} />}
              <Text style={styles.selectedValue}>{formatTime(date)}</Text>
            </View>

            <View style={styles.actionButtonContainer}>
              <TouchableOpacity style={styles.unselectedButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.unselectedButtonText}>{'Cancel'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.selectedButton} onPress={() => alert('Saved!')}>
                <Text style={styles.selectedButtonText}>{'Save'}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
  },
  scrollView: {
    flex: 1,
  },
  headerText: {
    color: '#101623',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  labelText: {
    color: '#101623',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 11,
  },
  icon: {
    width: 29,
    height: 30,
    marginRight: 14,
  },
  rowText: {
    color: '#101623',
    fontSize: 14,
    flex: 1,
  },
  dropdownIcon: {
    width: 15,
    height: 9,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderColor: '#F3E8ED',
    borderWidth: 1,
    borderRadius: 15,
    padding: 16,
    marginBottom: 18,
    color: '#101623',
    fontSize: 16,
  },
  dateButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  unselectedButton: {
    width: 0.3 * Dimensions.get('window').width,
    alignItems: 'center',
    borderColor: '#DB3169',
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 12,
  },
  unselectedButtonText: {
    color: '#DB3169',
    fontSize: 12,
  },
  selectedButton: {
    width: 0.3 * Dimensions.get('window').width,
    alignItems: 'center',
    backgroundColor: '#DB3169',
    borderRadius: 15,
    paddingVertical: 12,
  },
  selectedButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  dropdown: {
    marginBottom: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  centeredButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DB3169',
  },
  selectedValue: {
    marginLeft: 10,
    fontSize: 14,
    color: '#101623',
  },
})

export default ScheduleModal