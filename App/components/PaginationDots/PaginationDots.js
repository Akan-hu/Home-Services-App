import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { isIOS } from '../../Utils/Constants'
import { PRIMARY } from '../../Utils/Constants/colors'

const PaginationDots = (props) => {
  const { numberOfDots, activeIndex, paginationDotsStyle } = props

  return (
    <SafeAreaView>
      <View style={[styles.paginationDots, paginationDotsStyle]}>
        {numberOfDots > 0 &&
          Array(numberOfDots)
            .fill(0)
            ?.map((_, index) => {
              return (
                <View
                  style={
                    activeIndex === index ? styles.activeDotStyle : styles.dot
                  }
                  key={index}
                />
              )
            })}
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  paginationDots: {
    height: 8,
    margin: 8,
    flexDirection: !isIOS() ? 'row-reverse' : 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 6,
    marginHorizontal: 4,
    backgroundColor: 'grey',
  },
  activeDotStyle: {
    width: 11,
    height: 11,
    borderRadius: 6,
    marginHorizontal: 4,
    backgroundColor: PRIMARY,
  },
})
export default PaginationDots
