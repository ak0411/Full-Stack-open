import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    hideNotification() {
      return null
    }
  }
})

export const setNotification = (content, seconds) => {
  return dispatch => {
    dispatch(showNotification(content))
    setTimeout(() => {
      dispatch(hideNotification())
    }, seconds * 1000)
  }
}

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer