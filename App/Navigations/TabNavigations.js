import { View, Text } from 'react-native'
import React from 'react'

import { BOOKING_SCREEN, MAIN_HOME, PROFILE } from './constants'
import Profile from '../Screens/ProfileScreen/Profile'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import BookingScreen from '../Screens/BookingScreen/BookingScreen'
import { PRIMARY } from '../Utils/Constants/colors'
import HomeNavigation from './HomeNavigation'
import { isIOS } from '../Utils/Constants'

const Tab = createBottomTabNavigator()
const TabNavigations = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: PRIMARY,
      }}
    >
      <Tab.Screen
        name={MAIN_HOME}
        component={HomeNavigation}
        options={{
          tabBarLabel: ({ color }) => (
            <Text
              style={{
                color: color,
                fontSize: 12,
                marginTop: -7,
                padding: 3,
              }}
            >
              Home
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={BOOKING_SCREEN}
        component={BookingScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text
              style={{ color: color, fontSize: 12, marginTop: -7, padding: 3 }}
            >
              Booking
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bookmark" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={PROFILE}
        component={Profile}
        options={{
          tabBarLabel: ({ color }) => (
            <Text
              style={{ color: color, fontSize: 12, marginTop: -7, padding: 3 }}
            >
              Profile
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-circle-o" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigations
