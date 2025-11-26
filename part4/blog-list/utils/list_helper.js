const dummy = () => {
  return 1
}

/*
Receives a list of blog posts as a parameter.
Returns the total sum of likes in all of the blog posts.
*/

const totalLikes = (blogs) => {
  return blogs.reduce((total, entry) => total + entry.likes, 0)
}

/**
 * Define a new favoriteBlog function that receives a list of blogs as a parameter.
 * The function returns the blog with the most likes.
 * If there are multiple favorites, it is sufficient for the function to return any one of them.
 */

const favoriteBlog = blogs => {
  if (!blogs || blogs.length === 0) return null

  return blogs.reduce((accumulator, blog) =>
    accumulator.likes > blog.likes ? accumulator : blog
  )
}

/**
 *
 * @param { array } blogs - array of blog objects
 * @returns { object || 0 } object with author name who has the largest amount of blogs and that number of blogs listed or 0
 */

const mostBlogs = blogs => {
  if (!blogs || blogs.length === 0) return 0

  const counts = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1
    return acc
  }, {})

  const author = Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  )

  return {
    author,
    blogs: counts[author]
  }
}

/**
 * @param { array } blogs - list of blog objects
 * @returns { object || 0 } - object with author whose blog posts have the largest amount of likes and the number of likes or 0
 */

const mostLikes = blogs => {
if (!blogs || blogs.length === 0) return 0

  const counts = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes
    return acc
  }, {})

  const author = Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  )

  return {
    author,
    likes: counts[author]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
