import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { PRIMARY } from '../../Utils/Constants/colors'
import { getDeviceHeight } from '../../Utils/Constants'
import * as WebBrowser from 'expo-web-browser'
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser'
import { useOAuth } from '@clerk/clerk-expo'
WebBrowser.maybeCompleteAuthSession()
const Login = () => {
  useWarmUpBrowser()
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow()

      if (createdSessionId) {
        setActive({ session: createdSessionId })
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])
  return (
    <View style={style.view}>
      <View style={style.imageView}>
        <Image
          source={require('../../../assets/images/Assets/login.png')}
          style={style.img}
        />
      </View>

      <View style={style.subContainer}>
        <Text style={style.head}>
          Let's find
          <Text style={style.subText}>
            {' '}
            Professional Cleaning and Repair
          </Text>{' '}
          services
        </Text>
        <Text style={style.best}>
          Best App to find services near you which deliver you a professional
          service
        </Text>
        <TouchableOpacity style={style.button} onPress={() => onPress()}>
          <Text style={style.start}>Let's Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  start: {
    color: PRIMARY,
  },
  button: {
    backgroundColor: 'white',
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 20,
    marginTop: 50,
  },
  best: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 12,
    color: 'white',
  },
  head: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '400',
    fontSize: 24,
    marginHorizontal: 20,
  },
  subText: {
    fontWeight: '700',
  },
  img: {
    width: 250,
    marginTop: 70,
    height: getDeviceHeight() * 0.58,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 15,
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    flex: 1,
    width: '100%',
  },
  subContainer: {
    backgroundColor: '#8E3FFF',
    flex: 1,
    marginTop: -5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
})
export default Login
