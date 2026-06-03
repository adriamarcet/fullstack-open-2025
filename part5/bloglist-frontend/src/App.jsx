import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import toast from 'react-hot-toast'
import './App.css'

import BaseLayout from './layouts/BaseLayout'
import HomePage from './pages/HomePage'
import BlogsPage from './pages/BlogsPage'
import CreatePage from './pages/CreatePage'
import BlogDetailPage from './pages/BlogDetailPage'

import {
  BrowserRouter as Router,
  Routes, Route, Link
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

  const logEvent = (message, type = 'info') => {
    const timestamp = new Date().toLocaleString()
    console.log(`[${timestamp}] [${type}] ${message}`)
  }

  const notifyError = message => {
    const timestamp = new Date().toLocaleString()
    console.error(`[${timestamp}] [error] ${message}`)
    toast.error(message)
  }

  return (
    <>
      <Router>
        <Routes>
          <Route element={<BaseLayout user={user} />}>
            <Route path="/" element={<HomePage  user={user} blogs={blogs} blogFormRef={blogFormRef}  logEvent={logEvent} notifyError={notifyError} />} />
            <Route path="/blogs" element={<BlogsPage user={user} blogs={blogs} logEvent={logEvent} notifyError={notifyError} />} />
            <Route path="/blogs/:id" element={
              <BlogDetailPage blogs={blogs} user={user} />
            } />
            <Route path="/create" element={<CreatePage />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App