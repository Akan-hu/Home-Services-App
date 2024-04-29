import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {
  COLOR_BLACK_100,
  COLOR_GREEN_600,
  COLOR_GREEN_LIGHT,
  COLOR_RED_40,
  COLOR_RED_LIGHT,
} from '../../Utils/Constants/colors'
import { SUCCESS_TOAST, isIOS } from '../../Utils/Constants'

const ToastMessage = (props) => {
  const { title, desc, type } = props || {}
  return (
    <View
      pointerEvents="none"
      style={[
        styles.toastContainer,
        type === SUCCESS_TOAST ? styles.toastSuccess : styles.toastError,
      ]}
    >
      <Text style={styles.title}>{title}</Text>
      {desc && <Text style={styles.descStyle}>{desc}</Text>}
    </View>
  )
}
const styles = StyleSheet.create({
  toastContainer: {
    width: '100%',
    borderBottomColor: COLOR_RED_40,
    backgroundColor: COLOR_RED_LIGHT,
    borderBottomWidth: 1,
    paddingTop: isIOS() ? 55 : 45,
    marginTop: -40,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  toastSuccess: {
    borderBottomColor: COLOR_GREEN_600,
    backgroundColor: COLOR_GREEN_LIGHT,
  },
  toastError: {
    borderBottomColor: COLOR_RED_40,
    backgroundColor: COLOR_RED_LIGHT,
  },
  title: {
    color: COLOR_BLACK_100,
    fontFamily: 'outfit-medium',
    fontSize: 16,
    textAlign: 'left',
    paddingTop: 5,
  },
  descStyle: {
    textAlign: 'left',
  },
})
export default ToastMessage
