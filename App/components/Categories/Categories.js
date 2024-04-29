import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../Utils/Api/GlobalApi'
import HeaderTitle from '../HeaderTitle/HeaderTitle'
import { useNavigation } from '@react-navigation/native'
import { BUSINESS_LIST_BY_CATEGORY } from '../../Navigations/constants'

const Categories = () => {
  const [categories, setCategories] = useState([])
  const navigation = useNavigation()
  const [viewAll, setViewAll] = useState(false)

  useEffect(() => {
    getAllCategories()
  }, [])
  const getAllCategories = () => {
    GlobalApi.getCategories()
      .then((res) => setCategories(res?.categories))
      .catch((e) => console.log(e))
  }
  const handleViewAll = () => {
    setViewAll(true) // Update state to show all categories
  }
  return (
    <View>
      <HeaderTitle
        title={'Categories'}
        seeAllReq={true}
        onPress={handleViewAll}
      />
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={viewAll ? categories : categories.slice(0, 3)} // Show all categories if viewAll is true, otherwise only show first 3 categories
        renderItem={({ item, index }) => (
          <View style={style.container}>
            <TouchableOpacity
              style={style.imageContainer}
              onPress={() =>
                navigation.push(BUSINESS_LIST_BY_CATEGORY, {
                  category: item.name,
                })
              }
            >
              <Image source={{ uri: item?.icon?.url }} style={style.imgStyle} />
            </TouchableOpacity>

            <Text style={style.text}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  )
}
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    marginTop: 15,
    backgroundColor: 'white',
    marginHorizontal: 15,
    padding: 18,
    borderRadius: 40,
    elevation: 1,
  },
  imgStyle: {
    width: 35,
    height: 35,
  },
  text: {
    textAlign: 'center',
    marginTop: 5,
  },
})
export default Categories
