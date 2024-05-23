import moment from 'moment'
import { Dimensions, Platform } from 'react-native'
import Toast from 'react-native-toast-message'
import * as Linking from 'expo-linking'
export const getDeviceWidth = () => {
  return Dimensions.get('window').width
}
export const SUCCESS_TOAST = 'successToast'
export const ERROR_TOAST = 'errorToast'
/**
 * return device height
 * @returns
 */
export const getDeviceHeight = () => {
  return Dimensions.get('window').height
}
export const isIOS = () => {
  return Platform.OS === 'ios'
}
export const showToast = (type, propsObject) => {
  Toast.show({
    type: type,
    props: propsObject,
  })
}

/** date formatting function */
export const formattedDate = (date) => {
  const formattedDate = moment(date).format('DD-MMMM-yyyy')
  return formattedDate
}

/** Developer phone number */
export const PHONE_NUMBER = '+916395909884'

export const callNumber = async (phone) => {
  const num = phone?.toString()
  await Linking?.openURL(`tel:${num}`)
}
