import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import toast from 'react-hot-toast'
import './App.css'
import { logEvent, notifyError } from './helpers'
import BaseLayout from './layouts/BaseLayout'
import HomePage from './pages/HomePage'
import BlogsPage from './pages/BlogsPage'
import CreatePage from './pages/CreatePage'
import LoginPage from './pages/LoginPage'
import BlogDetailPage from './pages/BlogDetailPage'

import {
  BrowserRouter as Router,
  Routes, Route, Link, useMatch
} from 'react-router-dom'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  const handleLogOut = () => {
    logEvent('User logged out', 'logout')
    window.localStorage.removeItem('loggedBlogListappUser')
    location.replace('./')
  }
  const addBlog = async blogObject => {
    try {
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))
      logEvent(`Added blog: ${createdBlog.title} by ${createdBlog.author}`, 'blog')
      toast.success(`New ${createdBlog.title} blog added successfully.`)
    } catch (error) {
      const message = error.response?.data?.error || 'Could not add blog'
      notifyError(message)
    }
  }

  const handleLike = async blog => {
    try {
      const newObject = {
        id: blog.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user
      }
      const updatedBlog = await blogService.update(blog.id, newObject)
      setBlogs(blogs.map(b => b.id !== updatedBlog.id ? b : updatedBlog))
      logEvent(`${updatedBlog.title} has been updated`, 'blog')
      toast.success(`${updatedBlog.title} updated successfully.`)
    } catch (error) {
      const message = error.response?.data?.error || 'Could not add a like to this blog'
      notifyError(message)
    }
  }

  const deleteBlog = (id) => {
    const blogToDelete = blogs.find(b => b.id === id)

    blogService.remove(id).then(() => {
      setBlogs(blogs.filter(n => n.id !== id))
      if (blogToDelete) {
        logEvent(`${blogToDelete.title} has been removed`, 'blog')
        toast.success(`${blogToDelete.title} removed successfully.`)
      }
    }).catch(error => {
      const message = error.response?.data?.error || 'Could not delete this blog'
      notifyError(message)
    })
  }

  return (
    <>
      <Routes>
        <Route element={<BaseLayout user={user} setUser={setUser} handleLogOut={handleLogOut} />}>
          <Route path="/" element={
            <HomePage
              blogs={blogs}
              user={user}
              handleLike={handleLike}
              deleteBlog={deleteBlog}
            />} />
          <Route path="/blogs" element={
            <BlogsPage
              blogs={blogs}
              user={user}
              handleLike={handleLike}
              deleteBlog={deleteBlog}
            />} />
          <Route path="/blogs/:id" element={
            <BlogDetailPage
              blog={blog}
              user={user}
              handleLike={handleLike}
              deleteBlog={deleteBlog}
            />
          } />
          <Route path="/create" element={
            <CreatePage
              user={user}
              addBlog={addBlog}
            />} />
          <Route path="/login" element={
            <LoginPage
              user={user}
              setUser={setUser}
              handleLogOut={handleLogOut}
            />} />
        </Route>
      </Routes>
    </>
  )
}

export default App