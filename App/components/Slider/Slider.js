import { View, StyleSheet, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../Utils/Api/GlobalApi'
import { getDeviceWidth } from '../../Utils/Constants'
import HeaderTitle from '../HeaderTitle/HeaderTitle'

const Slider = () => {
  const [slider, setSlider] = useState([])
  useEffect(() => {
    getSliders()
  }, [])
  const getSliders = () => {
    GlobalApi.getSlider()
      .then((res) => {
        setSlider(res?.sliders)
      })
      .catch((e) => console.log(e))
  }
  return (
    <View style={style.container}>
      <HeaderTitle title={'Offers For You'} />
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={slider}
        renderItem={({ item, index }) => (
          <View>
            <Image source={{ uri: item?.image?.url }} style={style.slider} />
          </View>
        )}
      />
    </View>
  )
}
const style = StyleSheet.create({
  slider: {
    marginTop: 10,
    width: getDeviceWidth() * 0.92,
    height: 180,
    marginRight: 15,
    borderRadius: 20,
  },
})
export default Slider
