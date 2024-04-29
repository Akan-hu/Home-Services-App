import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import {
  COLOR_PRIMARY_EXTRA_LIGHT,
  PRIMARY,
} from '../../Utils/Constants/colors'
import { useNavigation } from '@react-navigation/native'
import { BUSINESS_DETAIL } from '../../Navigations/constants'

const BusinessListItemSmall = (props) => {
  const { data } = props || {}
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      style={style.container}
      onPress={() => navigation.push(BUSINESS_DETAIL, { business: data })}
    >
      <Image source={{ uri: data?.images[0]?.url }} style={style.img} />
      <View style={style.textView}>
        <Text style={style.text1}>
          {data.name.length > 20 ? data.name.slice(0, 17) + '...' : data.name}
        </Text>
        <Text style={style.text2}>{data.contactPerson}</Text>
        <Text style={style.text3}>{data.category.name}</Text>
      </View>
    </TouchableOpacity>
  )
}
const style = StyleSheet.create({
  text1: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
  },
  text2: {
    color: 'grey',
    fontSize: 14,
    marginTop: 3,
  },
  text3: {
    fontFamily: 'outfit-medium',
    color: PRIMARY,
    backgroundColor: COLOR_PRIMARY_EXTRA_LIGHT,
    fontSize: 14,
    padding: 3,
    marginTop: 5,
    textAlign: 'center',
    width: '50%',
  },
  textView: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  container: {
    marginTop: 15,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 2,
    marginHorizontal: 8,
    marginBottom: 10,
  },
  img: {
    width: 160,
    height: 110,
    borderRadius: 15,
  },
})
export default BusinessListItemSmall
