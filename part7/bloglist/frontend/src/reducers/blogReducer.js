import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    append(state, action) {
      state.push(action.payload)
    },
    update(state, action) {
      const id = action.payload.id
      return state.map(blog =>
        blog.id !== id ? blog : action.payload
      )
    },
    remove(state, action) {
      return state.filter(blog => blog.id !== action.payload.id)
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = (blog, blogFormRef) => {
  return async dispatch => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blog)
      .then((returnedBlog) => {
        dispatch(append(returnedBlog))
        dispatch(setNotification({
          isError: false,
          message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        }, 5))
      })
      .catch((exception) => {
        dispatch(setNotification({
          isError: true,
          message: exception.response.data.error
        }, 5))
      })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    blogService
      .update(updatedBlog)
      .then((returnedBlog) => {
        dispatch(update(returnedBlog))
        dispatch(setNotification({
          isError: false,
          message: `You liked ${returnedBlog.title} by ${returnedBlog.author}`
        }, 5))
      })
      .catch((exception) => {
        dispatch(setNotification({
          isError: true,
          message: exception.response.data.error
        }, 5))
      })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    blogService
      .remove(blog)
      .then(() => {
        dispatch(remove(blog))
        dispatch(setNotification({
          isError: false,
          message: `Successfully removed ${blog.title} by ${blog.author}`
        }, 5))
      })
      .catch((exception) => {
        dispatch(setNotification({ isError: true, message: exception.response.data.error }, 5))
      })
  }

}

export const { setBlogs, append, update, remove } = blogSlice.actions
export default blogSlice.reducer