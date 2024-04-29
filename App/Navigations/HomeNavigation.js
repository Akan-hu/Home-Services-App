import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import CategoryBusinessList from '../Screens/ListByCategoryBusinessList/CategoryBusinessList'
import { BUSINESS_DETAIL, BUSINESS_LIST_BY_CATEGORY, HOME } from './constants'
import Home from '../Screens/HomeScreen/Home'
import BusinessDetailScreen from '../Screens/BusinessDetailScreen/BusinessDetailScreen'
const Stack = createStackNavigator()

const HomeNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={HOME} component={Home} />
      <Stack.Screen
        name={BUSINESS_LIST_BY_CATEGORY}
        component={CategoryBusinessList}
      />
      <Stack.Screen name={BUSINESS_DETAIL} component={BusinessDetailScreen} />
    </Stack.Navigator>
  )
}

export default HomeNavigation
