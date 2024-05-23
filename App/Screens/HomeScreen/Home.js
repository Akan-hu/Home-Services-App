import { View, ScrollView, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Slider from '../../components/Slider/Slider'
import Categories from '../../components/Categories/Categories'
import BusinessList from '../../components/BusinessList/BusinessList'
import GlobalApi from '../../Utils/Api/GlobalApi'
import { PRIMARY } from '../../Utils/Constants/colors'
const Home = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    GlobalApi.getSlider().then((res) => setLoading(false))
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Header />
      {!loading ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Slider />
          <Categories />
          <BusinessList />
        </ScrollView>
      ) : (
        <View style={style.indicatorView}>
          <ActivityIndicator size={'large'} color={PRIMARY} />
        </View>
      )}
    </View>
  )
}
const style = StyleSheet.create({
  indicatorView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
export default Home
