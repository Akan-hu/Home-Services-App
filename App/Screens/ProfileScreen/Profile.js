import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native'
import React from 'react'
import { PHONE_NUMBER, callNumber, isIOS } from '../../Utils/Constants'
import { Ionicons } from '@expo/vector-icons'

import { PRIMARY } from '../../Utils/Constants/colors'
import { useUser, useAuth } from '@clerk/clerk-expo'
import { useNavigation } from '@react-navigation/native'
import HomeNavigation from '../../Navigations/HomeNavigation'
import { BOOKING_SCREEN, MAIN_HOME } from '../../Navigations/constants'

const Profile = () => {
  const { user } = useUser()
  const { isLoaded, signOut } = useAuth()
  const navigation = useNavigation()
  const profileMenu = [
    {
      id: 1,
      name: 'Home',
      icon: 'home',
    },
    {
      id: 2,
      name: 'My Booking',
      icon: 'bookmark-sharp',
    },
    {
      id: 3,
      name: 'Contact Us',
      icon: 'call',
    },
    {
      id: 4,
      name: 'Logout',
      icon: 'log-out',
    },
  ]

  if (!isLoaded) {
    return null
  }
  const userLogout = async () => {
    try {
      await signOut()
    } catch (e) {
      console.log(e)
    }
  }

  const handlePress = (id) => {
    switch (id) {
      case 0:
        navigation?.navigate(MAIN_HOME)
        break
      case 1:
        navigation?.navigate(BOOKING_SCREEN)
        break
      case 2:
        callNumber(PHONE_NUMBER)
        break
      case 3:
        userLogout()
        break
      default:
        null
    }
  }
  return (
    <View>
      <View style={style.headerView}>
        <Text style={style.profile}>My Profile</Text>
        <View style={style.imageView}>
          <Image source={{ uri: user?.imageUrl }} style={style.image} />
          <Text style={style.name}>{user?.fullName}</Text>
          <Text style={style.email}>
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>
      </View>
      <View style={style.menuView}>
        <FlatList
          data={profileMenu}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={style.menuView}
              onPress={() => handlePress(index)}
            >
              <View style={style.menuView2}>
                <Ionicons name={item?.icon} size={40} color={PRIMARY} />
                <Text style={style.text}>{item?.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  )
}
const style = StyleSheet.create({
  text: { fontSize: 16, fontFamily: 'outfit-medium' },
  menuView: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  menuView2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: isIOS() ? 17 : 14,
    borderBottomStartRadius: 30,
    borderTopRightRadius: 10,
    elevation: 5,
    shadowColor: PRIMARY,
    shadowOffset: { width: 10, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    opacity: 0.8,

    gap: 10,
  },
  headerView: { backgroundColor: PRIMARY, paddingTop: 30, padding: 20 },
  image: { height: 100, width: 100, borderRadius: 50, marginBottom: 10 },
  imageView: { alignItems: 'center', marginTop: 10 },
  profile: {
    paddingTop: 30,
    fontSize: 25,
    color: 'white',
    fontFamily: 'outfit-medium',
  },
  name: { color: 'white', fontFamily: 'outfit-medium', fontSize: 18 },
  email: { color: 'white', fontFamily: 'outfit-medium' },
})
export default Profile
