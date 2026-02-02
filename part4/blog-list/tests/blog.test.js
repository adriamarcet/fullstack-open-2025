const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const dummyData = require('../data')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const { log } = require('node:console')

describe('Our dummy tests first', () => {
  test('dummy returns one', () => {
    const result = listHelper.dummy()
    assert.strictEqual(result, 1)
  })
})

describe('Run all tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

    /**
     * However, there is an even simpler way to implement the beforeEach function.
     * The easiest way to handle the situation is
     * by utilizing Mongoose's built-in method insertMany:

    beforeEach(async () => {
      await Note.deleteMany({})
      await Note.insertMany(helper.initialNotes)
    })
    */
  })

  describe('when there is initially some blogs saved', () => {
    test('Blog list is returned and equal to init list', async () => {
      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('Blog list is returned as json', async() => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-type', /application\/json/)
    })
  })

  describe('when managing database structure and format', async () => {
    test('unique identifier for blog is named id and _id is not present', async () => {
      const response = await api.get('/api/blogs')
      const blog = response.body[0]

      assert.ok(blog.id)
      assert.strictEqual(blog._id, undefined)
    })

    test('check if likes property is missing from request', async () => {
      const newBlog = {
        title: 'Test Title for POST',
        author: 'Test Author',
        url: 'http://example.com/test-post'
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.likes, 0)
    })


    test('A blog without title is not added to db', async () => {
      const newBlog = {
        author: 'Edsger W. Dijkstra',
        url: 'http://example.com/blog',
        likes: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('A blog without url is not added to db', async () => {
      const newBlog = {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('when a specific note is modified', () => {
    test('a valid blog can be added', async () => {
      const newBlog =   {
        id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(r => r.title)
      assert(titles.includes('Go To Statement Considered Harmful'))
    })

    test('a specific blog can be viewed', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultBlog.body, blogToView)
    })

    test('a specific blog can be deleted', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      const ids = blogsAtEnd.map(b => b.id)
      assert(!ids.includes(blogToDelete.id))

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })

    test('a specific blog can be updated', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlog = {
        title: blogToUpdate.title,
        author: blogToUpdate.author,
        url: blogToUpdate.url,
        likes: 20
      }

      const result = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(result.body.likes, 20)
      assert.strictEqual(result.body.title, blogToUpdate.title)
    })

    test('likes can be updated for a blog', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[1]
      const originalLikes = blogToUpdate.likes

      const updatedBlog = { ...blogToUpdate, likes: originalLikes + 5 }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      const updatedBlogInDb = blogsAtEnd.find(b => b.id === blogToUpdate.id)

      assert.strictEqual(updatedBlogInDb.likes, originalLikes + 5)
    })
  })

  describe('Check if total likes is 36', () => {
    test('Get total likes from blog list and compare to final result', () => {
      const result = listHelper.totalLikes(dummyData)
      assert.strictEqual(result, 36)
    })
  })

  describe('Check favorite blog from list', () => {
    test('Get favorite item and compare with highest likes item', () => {
      const favorite = listHelper.favoriteBlog(dummyData)
      assert.deepStrictEqual(favorite, dummyData[2])
    })

    test('Get favorite item and compare to an empty list', () => {
      const favorite = listHelper.favoriteBlog([])
      assert.deepStrictEqual(favorite, null)
    })
  })

  describe('Check which author has most blogs listed', () => {
    const resultDummyObject = {
      author: 'Robert C. Martin',
      blogs: 3
    }

    test('Get author with most blogs entered from list and compare it with result dummy object', () => {
      const mostBlogsAuthor = listHelper.mostBlogs(dummyData)
      assert.deepStrictEqual(mostBlogsAuthor, resultDummyObject)
    })

    test('Get author with most blogs entered from list and compare it with 0', () => {
      const mostBlogsAuthor = listHelper.mostBlogs([])
      assert.strictEqual(mostBlogsAuthor, 0)
    })
  })

  describe('Check which author has most likes listed', () => {
    const resultDummyObject = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }

    test('Get author with most likes from list and compare it with result dummy object', () => {
      const mostLikesAuthor = listHelper.mostLikes(dummyData)
      assert.deepStrictEqual(mostLikesAuthor, resultDummyObject)
    })

    test('Get author with most likes entered from list and compare it with 0', () => {
      const mostLikesAuthor = listHelper.mostLikes([])
      assert.strictEqual(mostLikesAuthor, 0)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
