import { View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderTitle from '../HeaderTitle/HeaderTitle'
import GlobalApi from '../../Utils/Api/GlobalApi'
import BusinessListItemSmall from '../BusinessListItemSmall/BusinessListItemSmall'
import { useDispatch } from 'react-redux'
import { storeBusinessList } from '../../redux/reducers/BusinessList'

const BusinessList = () => {
  const [data, setData] = useState([])
  const dispatch = useDispatch()
  const getBusiness = () => {
    GlobalApi.getBusinessLists()
      .then((res) => {
        setData(res?.businessLists)
        dispatch(storeBusinessList({ data: res?.businessLists }))
      })
      .catch((e) => console.log(e))
  }
  useEffect(() => {
    getBusiness()
  }, [])

  return (
    <View style={{ marginHorizontal: 15 }}>
      <HeaderTitle title={'Latest Services'} />
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({ item, index }) => <BusinessListItemSmall data={item} />}
      />
    </View>
  )
}

export default BusinessList
