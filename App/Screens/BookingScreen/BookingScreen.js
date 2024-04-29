import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import GlobalApi from '../../Utils/Api/GlobalApi'
import { useUser } from '@clerk/clerk-expo'
import BusinessListItems from '../../components/BusinessListItems/BusinessListItems'
const BookingScreen = () => {
  const navigation = useNavigation()
  const [bookingData, setBookingData] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useUser()

  useEffect(() => {
    user && getUserBookingsFromDb()
  }, [user])
  const getUserBookingsFromDb = () => {
    setLoading(true)
    GlobalApi.getUserBookings(user?.primaryEmailAddress?.emailAddress)
      .then((res) => {
        setBookingData(res?.bookings)
        setLoading(false)
      })
      .catch((e) => console.log(e?.message))
  }
  const handleRefresh = () => {
    getUserBookingsFromDb()
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={style.header}>
        <View style={style.headerBack}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={28} color="black" />
          </TouchableOpacity>
          <Text style={style.cat}>My Bookings</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          onRefresh={() => handleRefresh()}
          data={bookingData}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <BusinessListItems
              data={item?.businessList}
              booking={item}
              containerStyle={style.containerStyle}
              imageStyle={style.imageStyle}
            />
          )}
        />
      </View>
    </View>
  )
}
const style = StyleSheet.create({
  imageStyle: {
    height: 120,
    width: 120,
  },
  header: {
    padding: 18,
  },
  headerBack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 35,
  },
  cat: {
    fontSize: 23,
    marginStart: 20,
    fontFamily: 'outfit-medium',
    color: 'black',
  },
})
export default BookingScreen
