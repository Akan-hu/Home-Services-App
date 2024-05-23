import { configureStore } from '@reduxjs/toolkit'
import BusinessList from '../reducers/BusinessList'

export const store = configureStore({
  reducer: {
    businessListReducer: BusinessList,
  },
})
