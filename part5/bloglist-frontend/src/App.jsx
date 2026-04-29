import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import toast, { Toaster } from 'react-hot-toast'
import EventSidebar from './components/EventSidebar'
import LoginForm from './components/LoginForm'
import './App.css'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const [eventLogs, setEventLogs] = useState(() => {
    const saved = window.localStorage.getItem('blogAppEventLogs')
    return saved ? JSON.parse(saved) : []
  })

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

  useEffect(() => {
    window.localStorage.setItem('blogAppEventLogs', JSON.stringify(eventLogs))
  }, [eventLogs])

  const handleLogOut = () => {
    logEvent('User logged out', 'logout', true)
    window.localStorage.removeItem('loggedBlogListappUser')
    location.reload()
  }

  const logEvent = (message, type = 'info', persist = false) => {
    const timestamp = new Date().toLocaleString()
    const entry = { message, type, timestamp }
    setEventLogs(prev => {
      const nextLogs = [...prev, entry]
      if (persist) {
        window.localStorage.setItem('blogAppEventLogs', JSON.stringify(nextLogs))
      }
      return nextLogs
    })
  }

  const clearEventsLog = () => {
    window.localStorage.removeItem('blogAppEventLogs')
    setEventLogs([])
  }

  const notifyError = message => {
    const timestamp = new Date().toLocaleString()
    const entry = { message, type: 'error', timestamp }
    setEventLogs(prev => [...prev, entry])
    toast.error(message)
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogListappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      logEvent('User logged in', 'login')
    } catch (error) {
      const message = error.response?.data?.error || 'Wrong credentials'
      notifyError(message)
    }
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

    blogFormRef.current.toggleVisibility()
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

  const handleDelete = async blog => {
    if (!window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      return
    }

    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      logEvent(`${blog.title} has been removed`, 'blog')
      toast.success(`${blog.title} removed successfully.`)
    } catch (error) {
      const message = error.response?.data?.error || 'Could not delete this blog'
      notifyError(message)
    }
  }

  const loginSection = () => {
    return (
      <Togglable buttonLabel="Log in">
        <section>
          <h2>Login</h2>
          <LoginForm submitAction={handleLogin} />
        </section>
      </Togglable>
    )
  }

  const blogFormSection = () => (
    <Togglable buttonLabel="Add new Blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const sortedBlogs = blogs ? [...blogs].sort((a, b) => b.likes - a.likes) : []

  return (
    <div className="app-layout">
      <EventSidebar eventLogs={eventLogs} clearEventsLog={clearEventsLog} />
      <main className="main-content">
        <Toaster />
        {!user && loginSection()}
        {user && (
          <div>
            <p>{user.name} logged in - <span><button className="button" onClick={handleLogOut}>Log out</button></span></p>
            {blogFormSection()}
          </div>
        )}
        <h2>Blogs List APP</h2>
        <div className="blog-list">
          {sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} user={user} likeFn={handleLike} deleteFn={handleDelete} />)}
        </div>
      </main>
    </div>
  )
}

export default App