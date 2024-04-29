import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { PRIMARY } from '../../Utils/Constants/colors'
import { FontAwesome } from '@expo/vector-icons'
import { isIOS } from '../../Utils/Constants'
const Header = () => {
  const { user } = useUser()
  return (
    user && (
      <View style={style.viewMain}>
        <View style={style.imageContainer}>
          <View style={style.container1}>
            <Image source={{ uri: user?.imageUrl }} style={style.img} />
            <View style={style.textview}>
              <Text style={style.wlc}>Welcome,</Text>
              <Text style={style.name}>{user?.fullName}</Text>
            </View>
          </View>
          <FontAwesome name="bookmark-o" size={27} color="white" />
        </View>
        <View style={style.searchView}>
          <TextInput placeholder="Search" style={style.inputStyle} />
          <View style={style.search}>
            <FontAwesome name="search" size={24} color="black" />
          </View>
        </View>
      </View>
    )
  )
}

const style = StyleSheet.create({
  search: {
    backgroundColor: 'white',
    marginTop: 10,
    marginLeft: 10,
    padding: isIOS() ? 10 : 7,
    borderRadius: 10,
  },
  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputStyle: {
    backgroundColor: 'white',
    padding: isIOS() ? 14 : 5,
    paddingLeft: 10,
    marginTop: 10,
    flex: 1,
    fontSize: 16,
    borderRadius: 10,
  },
  container1: {
    flexDirection: 'row',
  },
  textview: {
    marginLeft: 10,
  },
  wlc: {
    color: 'white',
  },
  name: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'outfit-medium',
  },
  viewMain: {
    backgroundColor: PRIMARY,
    paddingTop: 40,
    paddingHorizontal: 15,
    paddingBottom: 25,
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
  },
  img: {
    width: 45,
    height: 45,
    borderRadius: 30,
  },
  imageContainer: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
export default Header
