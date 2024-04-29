import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const HeaderTitle = (props) => {
  const { seeAllReq = false, title, onPress, containerStyle } = props || {}
  return (
    <View style={[style.view, containerStyle]}>
      <Text style={style.titleStyle}>{title}</Text>
      {seeAllReq ? (
        <TouchableOpacity onPress={onPress}>
          <Text>View All</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  )
}
const style = StyleSheet.create({
  view: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 18,
    fontFamily: 'outfit-medium',
  },
})
export default HeaderTitle
