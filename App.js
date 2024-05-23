import { StatusBar } from 'expo-status-bar'
import { LogBox, StyleSheet, View } from 'react-native'
import Login from './App/Screens/LoginScreen/Login'
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo'
import * as SecureStore from 'expo-secure-store'
import TabNavigations from './App/Navigations/TabNavigations'
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import ToastMessage from './App/components/ToastMessage/ToastMessage'
import { Provider } from 'react-redux'
import { store } from './App/redux/store/store'
LogBox.ignoreAllLogs()
const tokenCache = {
  async getToken(key) {
    try {
      return await SecureStore.getItemAsync(key)
    } catch (err) {
      return null
    }
  },
  async saveToken(key, value) {
    try {
      return await SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}
export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Outfit: require('./assets/fonts/static/Outfit-Regular.ttf'),
    'outfit-medium': require('./assets/fonts/static/Outfit-Medium.ttf'),
    'outfit-bold': require('./assets/fonts/static/Outfit-Bold.ttf'),
  })
  const toastConfig = {
    errorToast: ({ type, props }) => (
      <ToastMessage type={type} title={props.title} />
    ),
    successToast: ({ type, props }) => (
      <ToastMessage type={type} title={props.title} />
    ),
  }

  return (
    <Provider store={store}>
      <ClerkProvider
        publishableKey="pk_test_ZmxlZXQtdGljay00MS5jbGVyay5hY2NvdW50cy5kZXYk"
        tokenCache={tokenCache}
      >
        <View style={styles.container}>
          {/** This component render when user is signed in */}
          <SignedIn>
            <NavigationContainer>
              <TabNavigations />
            </NavigationContainer>
          </SignedIn>
          {/** This component render when user is not signed in */}
          <SignedOut>
            <Login />
          </SignedOut>
          <StatusBar style="auto" />
          {/** Add Toast component here */}
          <Toast config={toastConfig} />
        </View>
      </ClerkProvider>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
