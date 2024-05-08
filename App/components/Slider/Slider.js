import { View, StyleSheet, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../Utils/Api/GlobalApi'
import { getDeviceHeight, getDeviceWidth } from '../../Utils/Constants'
import HeaderTitle from '../HeaderTitle/HeaderTitle'
import PaginationDots from '../PaginationDots/PaginationDots'
import Carousel from 'react-native-reanimated-carousel'

const Slider = () => {
  const [slider, setSlider] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)

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
    <View style={style.view}>
      <HeaderTitle title={'Offers For You'} containerStyle={style.container} />
      <Carousel
        width={getDeviceWidth()}
        height={getDeviceHeight() * 0.25}
        data={slider}
        onSnapToItem={(index) => {
          setActiveIndex(index)
        }}
        loop
        autoPlay={true}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        enabled
        defaultIndex={0}
        snapEnabled
        scrollAnimationDuration={1000}
        pagingEnabled
        renderItem={({ item, index }) => (
          <View style={style.carouselView}>
            <Image source={{ uri: item?.image?.url }} style={style.img} />
          </View>
        )}
      />
      <PaginationDots
        activeIndex={activeIndex}
        numberOfDots={slider.length}
        paginationDotsStyle={style.dots}
      />
    </View>
  )
}
const style = StyleSheet.create({
  container: { marginHorizontal: 15 },
  dots: { margin: 0 },
  carouselView: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: getDeviceWidth() * 0.9,
    height: '95%',
    borderRadius: 15,
  },
})

export default Slider
