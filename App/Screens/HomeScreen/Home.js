import { View, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../components/Header/Header'
import Slider from '../../components/Slider/Slider'
import Categories from '../../components/Categories/Categories'
import BusinessList from '../../components/BusinessList/BusinessList'
const Home = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView
        style={{ marginHorizontal: 15 }}
        showsVerticalScrollIndicator={false}
      >
        <Slider />
        <Categories />
        <BusinessList />
      </ScrollView>
    </View>
  )
}

export default Home
