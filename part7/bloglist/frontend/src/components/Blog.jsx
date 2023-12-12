import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <Link
      className='text-decoration-none card-body'
      to={`/blogs/${blog.id}`}
    >
      <div className='card mb-2'>
        <div className='card-body'>
          <blockquote className='blockquote mb-0'>
            <p>{blog.title}</p>
            <footer className='blockquote-footer'>{blog.author}</footer>
          </blockquote>
        </div>
      </div>
    </Link>
  )
}

export default Blog
