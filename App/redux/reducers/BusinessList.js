import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  businessData: [],
}
export const businessList = createSlice({
  name: 'businessListReducer',
  initialState,
  reducers: {
    storeBusinessList: (state, action) => {
      state.businessData = action?.payload?.data
    },
  },
})

export const { storeBusinessList } = businessList.actions
export default businessList.reducer
