const blogsRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if (!body.title || body.title.trim() === '') {
    return response.status(400).json({ error: 'title is required' })
  }

  if (!body.url || body.url.trim() === '') {
    return response.status(400).json({ error: 'url is required' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ?? 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true }
  )

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user

  if (!user) {
    return response.status(400).json({ error: 'User id missing or not valid' })
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }

  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'Only the user who added the blog can delete it' })
  }

  await Blog.findByIdAndDelete(blog.id)

  response.status(204).end()
})

module.exports = blogsRouter
