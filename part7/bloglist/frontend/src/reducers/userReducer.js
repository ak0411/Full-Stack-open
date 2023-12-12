import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload
    },
    logout() {
      window.localStorage.clear()
      return null
    }
  }
})

export const loginUser = (userObject) => {
  return dispatch => {
    loginService
      .login(userObject)
      .then((returnedUser) => {
        window.localStorage.setItem('loggedUser', JSON.stringify(returnedUser))
        blogService.setToken(returnedUser.token)
        dispatch(login(returnedUser))
      })
      .catch(() => {
        dispatch(setNotification({
          isError: true,
          message: 'wrong credentials'
        }, 5))
      })
  }
}

export const { login, logout } = userSlice.actions
export default userSlice.reducer