const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? {}
    : blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const blogsByAuthor = _.groupBy(blogs, 'author')

  const topAuthor = _.maxBy(Object.keys(blogsByAuthor), author => blogsByAuthor[author].length)

  return {
    author: topAuthor,
    blogs: blogsByAuthor[topAuthor].length
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const blogsByAuthor = _.groupBy(blogs, 'author')

  const likesByAuthor = _.mapValues(blogsByAuthor, authorBlogs =>
    _.sumBy(authorBlogs, 'likes')
  )

  const topAuthor = _.maxBy(Object.keys(likesByAuthor), author => likesByAuthor[author])

  return {
    author: topAuthor,
    likes: likesByAuthor[topAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}