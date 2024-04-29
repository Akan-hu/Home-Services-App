import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import GlobalApi from '../../Utils/Api/GlobalApi'
import { Ionicons } from '@expo/vector-icons'
import BusinessListItems from '../../components/BusinessListItems/BusinessListItems'
const CategoryBusinessList = () => {
  const { params } = useRoute()
  const [businessList, setBusinessList] = useState([])
  const { category } = params
  const navigation = useNavigation()
  useEffect(() => {
    getCategory()
  }, [])
  const getCategory = () => {
    GlobalApi.getBusinessListByCategory(category)
      .then((data) => {
        setBusinessList(data?.businessLists)
      })
      .catch((e) => console.log(e))
  }
  return (
    <View>
      <View style={style.header}>
        <View style={style.headerBack}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={28} color="black" />
          </TouchableOpacity>
          <Text style={style.cat}>{category}</Text>
        </View>
      </View>
      {businessList?.length > 0 ? (
        <FlatList
          data={businessList}
          renderItem={({ item, index }) => <BusinessListItems data={item} />}
        />
      ) : (
        <Text style={style.noFound}>No Business Found</Text>
      )}
    </View>
  )
}

const style = StyleSheet.create({
  noFound: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
    fontFamily: 'outfit-medium',
    color: 'gray',
  },
  header: {
    padding: 18,
  },
  cat: {
    fontSize: 23,
    marginStart: 20,
    fontFamily: 'outfit-medium',
    color: 'black',
  },
  headerBack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 35,
  },
})
export default CategoryBusinessList
