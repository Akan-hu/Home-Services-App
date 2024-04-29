import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import CalendarPicker from 'react-native-calendar-picker'
import { COLOR_PRIMARY_LIGHT, PRIMARY } from '../../Utils/Constants/colors'
import HeaderTitle from '../HeaderTitle/HeaderTitle'
import {
  ERROR_TOAST,
  SUCCESS_TOAST,
  formattedDate,
  getDeviceHeight,
  getDeviceWidth,
  isIOS,
  showToast,
} from '../../Utils/Constants'
import GlobalApi from '../../Utils/Api/GlobalApi'
import { useUser } from '@clerk/clerk-expo'

const BookingModal = (props) => {
  const { heading, hideModal, businessId } = props || {}
  const [selectedStartDate, setSelectedStartDate] = useState(null)
  const [note, setNote] = useState('')
  const [timeList, setTimeList] = useState()
  const [selectedTime, setSelectedTime] = useState()
  const { user } = useUser()
  const onDateChange = (date) => {
    setSelectedStartDate(date)
  }
  useEffect(() => {
    businessId && getTime()
  }, [])

  const createBooking = () => {
    if (!selectedTime || !selectedStartDate) {
      alert('Select date and time')
      return
    }
    const data = {
      userName: user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      date: formattedDate(selectedStartDate),
      businessid: businessId,
      time: selectedTime,
    }
    GlobalApi.createBooking(data)
      .then((res) => {
        hideModal()
        showToast(SUCCESS_TOAST, {
          title: 'Booking Created Successfully!',
        })
      })
      .catch((e) => {
        hideModal()
        showToast(ERROR_TOAST, {
          title: e.message,
        })
      })
  }
  const getTime = () => {
    const timeList = []
    for (let i = 8; i <= 12; i++) {
      timeList.push({ time: i + ':00 AM' })
      timeList.push({ time: i + ':30 AM' })
    }
    for (let i = 1; i <= 7; i++) {
      timeList.push({ time: i + ':00 PM' })
      timeList.push({ time: i + ':30 PM' })
    }
    setTimeList(timeList)
  }
  const handlePress = (item) => {
    setSelectedTime(item.time)
  }
  const handleBooking = () => {
    createBooking()
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 18 }}>
      <KeyboardAvoidingView behavior={'position'}>
        <View style={style.headerBack}>
          <TouchableOpacity onPress={() => hideModal()}>
            <Ionicons name="arrow-back-outline" size={28} color="black" />
          </TouchableOpacity>
          <Text style={style.cat}>{heading}</Text>
        </View>
        <HeaderTitle
          title={'Select Date to book service'}
          containerStyle={style.header}
        />
        {/** Calender View */}
        <View style={style.calendar}>
          <CalendarPicker
            onDateChange={onDateChange}
            minDate={Date.now()}
            todayBackgroundColor={PRIMARY}
            todayTextStyle={{ color: 'white' }}
            selectedDayColor={'black'}
            selectedDayTextColor={'white'}
          />
        </View>
        {/** Time selection view */}
        <HeaderTitle title="Select Time Slot" containerStyle={style.header} />
        <View style={{ marginHorizontal: 10 }}>
          <FlatList
            data={timeList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => handlePress(item, index)}
                style={[
                  selectedTime == item.time ? style.selected : style.unselected,
                ]}
              >
                <Text
                  style={[
                    selectedTime == item.time ? style.text2 : style.text1,
                  ]}
                >
                  {item.time}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <HeaderTitle title="Your Message" containerStyle={style.header} />
        <View style={style.inputView}>
          <TextInput
            placeholder="Note"
            style={style.input}
            value={note}
            onChangeText={(text) => setNote(text)}
            multiline={true}
            numberOfLines={4}
          />
        </View>
        <TouchableOpacity style={style.button} onPress={handleBooking}>
          <Text style={style.btnText}>Confirm and Book</Text>
        </TouchableOpacity>

        {/* </View> */}
      </KeyboardAvoidingView>
    </ScrollView>
  )
}
const style = StyleSheet.create({
  btnText: {
    color: 'white',
    fontSize: isIOS() ? 18 : 15,
    fontFamily: 'outfit-medium',
  },
  button: {
    backgroundColor: PRIMARY,
    marginHorizontal: 15,
    alignItems: 'center',
    borderRadius: 25,
    padding: isIOS() ? 13 : 10,
    marginTop: 10,
    marginBottom: 15,
    elevation: 5,
  },
  inputView: {
    marginTop: 10,
    alignSelf: 'center',
    width: getDeviceWidth() * 0.91,
    borderRadius: 10,
    height: getDeviceHeight() * 0.14,
    borderWidth: 1,
    borderColor: PRIMARY,
    marginBottom: 10,
  },
  input: {
    padding: 10,
    fontSize: 16,
    fontFamily: 'outfit-medium',
    textAlignVertical: 'top',
  },
  text1: { color: PRIMARY },
  text2: { color: 'white' },
  selected: {
    backgroundColor: PRIMARY,
    padding: 10,
    borderWidth: 1,
    width: 100,
    marginTop: 10,
    alignItems: 'center',
    borderColor: PRIMARY,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  unselected: {
    padding: 10,
    borderWidth: 1,
    width: 100,
    marginTop: 10,
    alignItems: 'center',
    borderColor: PRIMARY,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  calendar: {
    backgroundColor: COLOR_PRIMARY_LIGHT,
    marginTop: 15,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },

  header: { marginStart: 15, marginBottom: 5 },
  headerBack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: isIOS() ? 38 : 0,
    marginStart: 15,
  },
  cat: {
    fontSize: 23,
    marginStart: 20,
    fontFamily: 'outfit-medium',
    color: 'black',
  },
})
export default BookingModal
