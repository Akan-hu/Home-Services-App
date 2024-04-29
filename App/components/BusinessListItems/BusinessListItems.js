import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import {
  COLOR_PRIMARY_EXTRA_LIGHT,
  PRIMARY,
} from '../../Utils/Constants/colors'
import { useNavigation } from '@react-navigation/native'
import { BUSINESS_DETAIL } from '../../Navigations/constants'
import { Entypo } from '@expo/vector-icons'

const BusinessListItems = ({ data, booking, containerStyle, imageStyle }) => {
  const navigation = useNavigation()
  return (
    <View>
      <TouchableOpacity
        style={[style.container1, containerStyle]}
        onPress={() =>
          !booking?.id
            ? navigation.push(BUSINESS_DETAIL, { business: data })
            : null
        }
      >
        <Image
          source={{ uri: data?.images[0]?.url }}
          style={[style.img, imageStyle]}
        />

        <View style={style.textview}>
          <Text style={style.text1}>
            {data?.name?.length > 15
              ? data?.name?.slice(0, 15) + '...'
              : data?.name}
          </Text>
          <Text style={style.text2}>{data?.contactPerson}</Text>
          <View style={style.location}>
            <MaterialIcons name="location-on" size={18} color={PRIMARY} />
            <Text style={style.text2}>{data?.address}</Text>
          </View>
          {booking?.id ? (
            <View>
              <View style={style.location}>
                <Entypo name="calendar" size={18} color={PRIMARY} />
                <Text style={style.text2}>{booking?.date}</Text>
              </View>

              <Text style={style.booked}>{booking?.bookingStatus}</Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  )
}
const style = StyleSheet.create({
  booked: {
    backgroundColor: COLOR_PRIMARY_EXTRA_LIGHT,
    width: 70,
    textAlign: 'center',
    marginTop: 10,
    padding: 3,
    color: PRIMARY,
  },
  text1: {
    fontFamily: 'outfit-medium',
    color: 'black',

    fontSize: 18,
    marginLeft: 5,
  },
  text2: {
    color: 'gray',
    marginLeft: 5,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
  },
  img: {
    height: 80,
    width: 80,
    borderRadius: 15,
  },
  textview: {
    marginHorizontal: 8,
    marginLeft: 10,
    flex: 1,
  },
  container1: {
    opacity: 10,
    alignItems: 'center',
    marginHorizontal: 15,
    borderRadius: 15,
    marginVertical: 8,
    padding: 12,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
})
export default BusinessListItems
