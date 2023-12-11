const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const blog = new Blog({ ...request.body, user: user.id })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  const savedUser = await user.save()
  savedBlog.user = savedUser

  response.status(201).json(savedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const comment = new Comment({ ...request.body, blog: blog.id })
  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)

  let savedBlog = await blog.save()
  savedBlog = await Blog
    .findById(savedBlog._id)
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 })

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() !== user.id.toString()) {
    return response
      .status(401)
      .json({
        error: `Unauthorized, cannot remove ${blog.title} by ${blog.author}`,
      })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const { title, url, author, likes } = request.body
  const user = request.user

  if (!user) {
    return response
      .status(401)
      .json({
        error: `Unauthorized, cannot update ${title} by ${author}`,
      })
  }

  let updatedBlog = await Blog
    .findByIdAndUpdate(
      request.params.id,
      { title, url, author, likes },
      { new: true }
    )

  updatedBlog = await Blog.findById(updatedBlog._id)
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 })

  response.json(updatedBlog)
})

module.exports = blogsRouter
