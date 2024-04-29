import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Linking,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Carousel from 'react-native-reanimated-carousel'

import { getDeviceHeight, getDeviceWidth, isIOS } from '../../Utils/Constants'
import PaginationDots from '../../components/PaginationDots/PaginationDots'
import {
  COLOR_PRIMARY_EXTRA_LIGHT,
  PRIMARY,
} from '../../Utils/Constants/colors'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle'
import BookingModal from '../../components/BookingModal/BookingModal'
const BusinessDetailScreen = () => {
  const { params } = useRoute()
  const { business } = params
  const [data, setData] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const navigation = useNavigation()
  const [showFullContent, setShowFullContent] = useState(false)
  useEffect(() => {
    setData(business)
  }, [])
  const handleMessageClick = () => {
    Linking.openURL(
      'mailto:' +
        data?.email +
        '?subject=Need Services&body=Hi There, I am looking for your service please provide more details.'
    )
  }
  return (
    <View style={style.view}>
      <View style={style.headerBack}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Ionicons name="arrow-back-outline" size={28} color="black" />
        </TouchableOpacity>
        <Text style={style.cat}>{data?.contactPerson}</Text>
      </View>
      <ScrollView>
        <Carousel
          width={getDeviceWidth()}
          height={getDeviceHeight() * 0.35}
          data={data?.images}
          onSnapToItem={(index) => {
            setActiveIndex(index)
          }}
          loop
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          enabled
          defaultIndex={0}
          snapEnabled
          scrollAnimationDuration={100}
          pagingEnabled
          renderItem={({ item, index }) => (
            <View style={style.carouselView}>
              <Image source={{ uri: item?.url }} style={style.img} />
            </View>
          )}
        />
        <PaginationDots
          activeIndex={activeIndex}
          numberOfDots={data?.images?.length}
        />
        <View style={style.content}>
          <Text style={style.name}>{data?.name}</Text>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}
          >
            <Text style={style.text1}>{data?.contactPerson} 🌟 </Text>
            <Text style={style.category}>{data.category?.name}</Text>
          </View>
          <View style={style.location}>
            <MaterialIcons name="location-on" size={20} color={PRIMARY} />
            <Text style={style.locationText}>{data?.address}</Text>
          </View>
          <View style={style.line}></View>

          <HeaderTitle title={'About Me'} />
          <View style={{ marginBottom: showFullContent ? 0 : 10 }}>
            <Text
              style={style.aboutText}
              numberOfLines={showFullContent ? 20 : 3}
            >
              {data?.about}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setShowFullContent(!showFullContent)}
          >
            <Text style={style.read}>
              {showFullContent ? 'Read Less' : 'Read More'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={style.bottom}>
        <TouchableOpacity
          style={style.msgBtn}
          onPress={() => handleMessageClick()}
        >
          <Text style={style.msgText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.msgBtn2}
          onPress={() => setShowModal(true)}
        >
          <Text style={style.bookText}>Book Now</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showModal} animationType="slide" backButtonClose={true}>
        <BookingModal
          heading={data.category?.name}
          hideModal={() => setShowModal(false)}
          businessId={data?.id}
        />
      </Modal>
    </View>
  )
}

const style = StyleSheet.create({
  msgText: {
    color: PRIMARY,
    fontFamily: 'outfit-medium',
    fontSize: 18,
    textAlign: 'center',
  },
  bookText: { color: 'white', fontFamily: 'outfit-medium', fontSize: 18 },

  msgBtn: {
    padding: isIOS() ? 15 : 12,
    borderWidth: 1,
    width: getDeviceWidth() * 0.43,
    borderColor: PRIMARY,
    borderRadius: 25,
  },
  msgBtn2: {
    backgroundColor: PRIMARY,
    padding: isIOS() ? 15 : 12,
    width: getDeviceWidth() * 0.43,
    alignItems: 'center',
    borderRadius: 25,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  read: {
    color: PRIMARY,
    fontSize: 16,
    marginBottom: 20,
  },
  about: { fontFamily: 'outfit-medium', fontSize: 20 },
  aboutText: { lineHeight: 25 },
  line: {
    borderWidth: 0.5,
    marginVertical: 20,
    marginHorizontal: 5,
    borderColor: 'grey',
  },
  locationText: { fontFamily: 'outfit-medium', marginLeft: 5, color: 'grey' },
  location: { flexDirection: 'row', marginTop: 5, alignItems: 'center' },
  text1: { fontSize: 20, fontFamily: 'outfit-medium', color: PRIMARY },
  category: {
    backgroundColor: COLOR_PRIMARY_EXTRA_LIGHT,
    color: PRIMARY,
    padding: 3,
    marginLeft: 5,
    fontFamily: 'outfit-medium',
  },
  name: {
    fontSize: 25,
    fontFamily: 'outfit-bold',
  },
  content: { marginHorizontal: 15 },
  view: {
    paddingTop: 18,
    flex: 1,
  },
  carouselView: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: getDeviceWidth() * 0.96,
    justifyContent: 'center',
    height: '100%',
    borderRadius: 15,
  },
  headerBack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 38,
    marginStart: 15,
  },
  cat: {
    fontSize: 23,
    marginStart: 20,
    fontFamily: 'outfit-medium',
    color: 'black',
  },
})
export default BusinessDetailScreen
