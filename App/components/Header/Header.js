import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { PRIMARY } from '../../Utils/Constants/colors'
import { FontAwesome } from '@expo/vector-icons'
import { isIOS } from '../../Utils/Constants'
import { useNavigation } from '@react-navigation/native'
import { SEARCH_SCREEN } from '../../Navigations/constants'
const Header = () => {
  const { user } = useUser()
  const navigation = useNavigation()
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
          <TouchableOpacity
            style={style.searchBtn}
            onPress={() => navigation?.navigate(SEARCH_SCREEN)}
          >
            <Text style={style.searchText}>Search service here..</Text>
          </TouchableOpacity>
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
  searchBtn: {
    backgroundColor: 'white',
    padding: isIOS() ? 13 : 10,
    paddingLeft: 10,
    marginTop: 10,
    flex: 1,
    fontSize: 16,
    borderRadius: 10,
  },
  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  searchText: { marginLeft: 10, fontSize: 16, color: 'grey' },
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
