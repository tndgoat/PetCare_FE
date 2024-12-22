// ProfileScreen.tsx
import React, { useState } from 'react'
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import LogoutModal from '../../components/Profile/LogoutModal'
import { useAppDispatch } from '../../hooks/redux'
import { logOut } from '../../store/reducers/login.reducer'

interface MenuItem {
  id: string
  icon: string
  title: string
  route: string
  onClick: () => void
}

const ProfileScreen = ({ navigation }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const menuItems: MenuItem[] = [
    {
      id: '1',
      icon: '❤️',
      title: 'My Pets',
      route: 'myPets',
      onClick: () => {},
    },
    {
      id: '2',
      icon: '📝',
      title: 'Appointment',
      route: 'appointment',
      onClick: () => {},
    },
    {
      id: '3',
      icon: '💳',
      title: 'Payment History',
      route: 'paymentHistory',
      onClick: () => {},
    },
    {
      id: '4',
      icon: '🔒',
      title: 'Change Password',
      route: 'changePassword',
      onClick: () => {},
    },
    {
      id: '5',
      icon: '🚪',
      title: 'Logout',
      route: 'logout',
      onClick: () => setShowLogoutModal(true),
    },
  ]

  const dispatch = useAppDispatch()
  const handleLogout = () => {
    console.log('User signed out!')
    setShowLogoutModal(false)
    dispatch(logOut())
    navigation.navigate('LoginScreen')
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Profile Header */}
        <View style={styles.header}>
          <Image
            source={{
              uri: 'https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png',
            }}
            style={styles.profileImage}
          />
          <Image source={require('../../images/bg-cover.png')} style={styles.profileCover} />
          <Text style={styles.userName}>Tung Nguyen</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Image source={require('../../images/Heartbeat.png')} style={styles.statIcon} />
            <Text style={styles.statLabel}>pets</Text>
            <Text style={styles.statValue}>5</Text>
          </View>
          <View style={[styles.statItem, styles.statBorder]}>
            <Image source={require('../../images/Fire.png')} style={styles.statIcon} />
            <Text style={styles.statLabel}>Pet Friends</Text>
            <Text style={styles.statValue}>28</Text>
          </View>
          <View style={styles.statItem}>
            <Image source={require('../../images/Barbell.png')} style={styles.statIcon} />
            <Text style={styles.statLabel}>Active Pet</Text>
            <Text style={styles.statValue}>103 pt</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem} onPress={() => item.onClick()}>
              <View style={styles.menuLeft}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <LogoutModal visible={showLogoutModal} onClose={() => setShowLogoutModal(false)} onLogout={handleLogout} username="Tung Nguyen" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  header: {
    backgroundColor: '#FF4D6D',
    padding: 20,
    alignItems: 'center',
    paddingTop: 80,
  },
  profileCover: {
    position: 'absolute',
    top: -60,
    right: -100,
    width: '90%',
    zIndex: 100,
    objectFit: 'contain',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FF4D6D',
    paddingBottom: 60,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  statValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statIcon: {
    width: 25,
    height: 25,
    marginHorizontal: 'auto',
  },
  statLabel: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  menuContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
    padding: 20,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  menuTitle: {
    fontSize: 16,
    color: '#333',
  },
  menuArrow: {
    fontSize: 24,
    color: '#ccc',
  },
})

export default ProfileScreen
