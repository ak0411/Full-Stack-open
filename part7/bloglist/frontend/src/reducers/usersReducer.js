import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
import { setNotification } from './notificationReducer'

const usersSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  }
})

export const initializeUsers = () => {
  return dispatch => {
    userService
      .getAll()
      .then(users => {
        dispatch(setUsers(users))
      })
      .catch((exception) => {
        dispatch(setNotification({
          isError: true,
          message: exception.response.data.error
        }, 5))
      })
  }
}

export const { setUsers } = usersSlice.actions
export default usersSlice.reducer