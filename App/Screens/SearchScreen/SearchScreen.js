import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Ionicons, EvilIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { BUSINESS_DETAIL } from '../../Navigations/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { isIOS } from '../../Utils/Constants'
const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchData, setSearchData] = useState([])
  const [recentSearches, setRecentSearches] = useState([])
  const { businessData } = useSelector((state) => state.businessListReducer)

  const navigation = useNavigation()
  useEffect(() => {
    loadRecentSearch()
  }, [])
  const handleSearch = useCallback((value) => {
    setSearchQuery(value)
    const query = value.toLowerCase()
    const filterResult = businessData.filter(
      (val) =>
        val.name.toLowerCase().includes(query) ||
        val.address.toLowerCase().includes(query)
    )
    setSearchData(filterResult)
    saveSearchQuery(value)
  }, [])

  //Storing recent searches in local storage
  const saveSearchQuery = async (query) => {
    if (query?.length > 2) {
      try {
        const existingSearches = await AsyncStorage.getItem('recentSearches')

        // Parse the existing searches JSON string into an array or use an empty array if there are no existing searches
        let searches = existingSearches ? JSON.parse(existingSearches) : []

        // Add the new query to the beginning of the array and remove any duplicates, keeping only the latest 5 searches
        searches = [query, ...searches.filter((q) => q != query)].slice(0, 5) // Keep latest 5 searches

        // Convert the updated searches array back into a JSON string and save it to AsyncStorage
        await AsyncStorage.setItem('recentSearches', JSON.stringify(searches))
        setRecentSearches(searches)
      } catch (e) {
        console.log(e)
      }
    }
  }

  //Retrieving recent searches from local storage
  const loadRecentSearch = async () => {
    try {
      const existingSearches = await AsyncStorage.getItem('recentSearches')
      if (existingSearches) {
        // Parse the JSON string into an array
        setRecentSearches(JSON.parse(existingSearches))
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    loadRecentSearch()
  }, [])

  useEffect(() => {
    if (searchQuery === '') {
      setSearchData([])
      return
    }
    handleSearch(searchQuery)
  }, [searchQuery, handleSearch])
  return (
    <View style={style.mainView}>
      <View style={style.topView}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color="black"
            style={style.back}
          />
        </TouchableOpacity>

        <View style={style.searchView}>
          <TextInput
            placeholder="Location or service eg: Cleaning"
            style={style.input}
            placeholderTextColor={'grey'}
            autoFocus={true}
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <Pressable
            onPress={() => {
              setSearchQuery('')
              setSearchData([])
              Keyboard.dismiss()
            }}
          >
            {searchQuery?.length > 0 && <Text>Clear</Text>}
          </Pressable>
        </View>
      </View>
      <ScrollView style={style.container}>
        {/** Search history */}
        {searchQuery === '' && recentSearches.length > 0 && (
          <View style={style.recentSearches}>
            <Text style={style.recentTitle}>Your most recent searches</Text>
            {recentSearches.map((item, index) => (
              <TouchableOpacity
                style={style.recent}
                key={index}
                onPress={() => setSearchQuery(item)}
              >
                <EvilIcons name="search" size={24} color="black" />
                <Text style={style.recentItem}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/** Search data */}
        {searchData.map((item, index) => {
          return (
            <Pressable
              key={index}
              style={style.dataView}
              onPress={() =>
                navigation.push(BUSINESS_DETAIL, { business: item })
              }
            >
              <Image source={{ uri: item?.images[0]?.url }} style={style.img} />
              <View style={{ gap: 5 }}>
                <Text style={style.name}>{item?.name}</Text>
                <Text>{item?.contactPerson}</Text>
              </View>
            </Pressable>
          )
        })}
      </ScrollView>
    </View>
  )
}

const style = StyleSheet.create({
  mainView: { flex: 1, marginTop: 55 },
  name: { fontSize: 16, fontWeight: '600', color: 'black' },
  dataView: {
    flexDirection: 'row',
    marginHorizontal: 18,
    gap: 20,
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: 'white',
    padding: 10,
    elevation: 1,
  },
  container: { marginTop: 10, marginBottom: 20 },
  img: { height: 55, width: 55, borderRadius: 5 },
  back: { marginLeft: 10 },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  input: { flex: 1 },
  searchView: {
    backgroundColor: 'white',
    flex: 1,
    borderWidth: 0.5,
    borderColor: 'grey',
    padding: isIOS() ? 16 : 8,
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recentSearches: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  recentTitle: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'outfit-medium',
    marginBottom: 10,
  },
  recentItem: {
    fontSize: 17,
    color: 'grey',
    fontFamily: 'outfit-medium',
    paddingVertical: 5,
  },
  recent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginVertical: 5,
  },
})
export default SearchScreen
