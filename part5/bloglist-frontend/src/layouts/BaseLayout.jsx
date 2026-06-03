import { Link, Outlet } from 'react-router-dom'
import Togglable from '../components/Togglable'
import LoginForm from '../components/LoginForm'
import blogService from '../services/blogs'
import loginService from '../services/login'

const BaseLayout = ({ user, setUser, logEvent, notifyError }) => {
  const padding = { paddingRight: 5 }

  const loginSection = () => (
    <Togglable buttonLabel="Log in" defaultVisible={false}>
      <section>
        <h2>Login</h2>
        <LoginForm submitAction={handleLogin} />
      </section>
    </Togglable>
  )

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogListappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      logEvent('User logged in', 'login')
    }
    catch (error) {
      const message = error.response?.data?.error || 'Wrong credentials'
      notifyError(message)
    }
  }

  return (
    <>
      <header className="container-xl">
        <nav className="navbar">
          <ul>
            <li><Link style={padding} to="/">Home</Link></li>
            <li><Link style={padding} to="/blogs">Blogs</Link></li>
            <li><Link style={padding} to="/create">Create</Link></li>
          </ul>
        </nav>
        {!user && loginSection()}
      </header>
      <main className="container-xl margin-start-xl">
        <Outlet />
      </main>
    </>
  )
}

export default BaseLayout