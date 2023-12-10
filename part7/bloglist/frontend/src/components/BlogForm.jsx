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
    <div className="formDiv">
      <h2>create new blog</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          title:
          <input
            id="title"
            type="text"
            autoComplete="off"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            autoComplete="off"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            autoComplete="off"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
