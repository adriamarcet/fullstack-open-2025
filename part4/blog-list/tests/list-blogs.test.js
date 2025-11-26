const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const dummyData = require('../data')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
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