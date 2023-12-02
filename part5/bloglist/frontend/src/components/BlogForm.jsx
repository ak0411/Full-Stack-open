import { useState } from 'react'
import blogsService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, Notify }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAddBlog = async (event) => {
    event.preventDefault()
    
    try {
      const returnedBlog = await blogsService.create({
        title, author, url
      })

      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(returnedBlog))
      Notify({ isError: false, message: `a new blog ${title} by ${author} added` })
    } catch (exception) {
      Notify({ isError: true, message: exception.message })
    }
  }

  return (
    <form onSubmit={handleAddBlog}>
      <div>
        title:
        <input
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
          type="text"
          autoComplete="off"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form> 
  )
}

export default BlogForm