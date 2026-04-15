import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import toast, { Toaster } from 'react-hot-toast'
import EventSidebar from './components/EventSidebar'
import LoginForm from './components/LoginForm'
import './App.css'
import Login from './services/login'
import Toggable from './components/Toggleble'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const [eventLogs, setEventLogs] = useState(() => {
    const saved = window.localStorage.getItem('blogAppEventLogs')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
    setErrorMessage(message)
    setEventLogs(prev => [...prev, entry])
    toast.error(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleLogin = async event => {
    event.preventDefault()
  
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        'loggedBlogListappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      logEvent('User logged in', 'login')
      setUsername('')
      setPassword('')
    } catch (error) {
      const message = error.response?.data?.error || 'Wrong credentials'
      notifyError(message)
    }
  }

  const addBlog = async event => {
    event.preventDefault()

    try {
      const newBlog = {
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl
      }

      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
      logEvent(`Added blog: ${createdBlog.title} by ${createdBlog.author}`, 'blog')
      toast.success(`New ${createdBlog.title} blog added successfully.`)
    } catch (error) {
      const message = error.response?.data?.error || 'Could not add blog'
      notifyError(message)
    }
  }

  const loginSection = () => {
    return (
      <Toggable buttonLabel="Log in">
        <section>
          <h2>Login</h2>
          <LoginForm 
            handleSubmit={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            username={username}
            password={password}
          />
        </section>
      </Toggable>
    )
  }

  const BlogForm = () => (
    <form className="form-card" onSubmit={addBlog}>
      <div className="form-field">
        <label className="form-label" htmlFor="blogTitle">Title</label>
        <input
          className="form-input"
          id="blogTitle"
          type="text"
          value={newBlogTitle}
          onChange={({ target }) => setNewBlogTitle(target.value)}
        />
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="blogAuthor">Author</label>
        <input
          className="form-input"
          id="blogAuthor"
          type="text"
          value={newBlogAuthor}
          onChange={({ target }) => setNewBlogAuthor(target.value)}
        />
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="blogUrl">URL/Website</label>
        <input
          className="form-input"
          id="blogUrl"
          type="text"
          value={newBlogUrl}
          onChange={({ target }) => setNewBlogUrl(target.value)}
        />
      </div>
      <button className="button" type="submit">Add new blog</button>
    </form>
  )

  return (
    <div className="app-layout">
      <EventSidebar eventLogs={eventLogs} clearEventsLog={clearEventsLog} />
      <main className="main-content">
        <Toaster />
        {!user && loginSection()}
        {user && (
          <div>
            <p>{user.name} logged in - <span><button className="button" onClick={handleLogOut}>Log out</button></span></p>
            {BlogForm()}
          </div>
        )}
        <h2>Blogs List APP</h2>
        <div className="blog-list">
          {blogs && blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      </main>
    </div>
  )
}

export default App