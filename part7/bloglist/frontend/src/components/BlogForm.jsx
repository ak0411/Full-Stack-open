import { useState } from 'react'
import { addBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const BlogForm = ( { blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleAddBlog = (event) => {
    event.preventDefault()
    dispatch(addBlog({ title, author, url }, blogFormRef))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className='formDiv'>
      <h2>Create New Blog</h2>
      <form onSubmit={handleAddBlog}>
        <div className='mb-3'>
          <label htmlFor='title' className='form-label'>
            Title:
          </label>
          <input
            id='title'
            type='text'
            className='form-control'
            autoComplete='off'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='author' className='form-label'>
            Author:
          </label>
          <input
            id='author'
            type='text'
            className='form-control'
            autoComplete='off'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='url' className='form-label'>
            URL:
          </label>
          <input
            id='url'
            type='text'
            className='form-control'
            autoComplete='off'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='create-button' type='submit' className='btn btn-success'>
        Create
        </button>
      </form>
    </div>

  )
}

export default BlogForm
