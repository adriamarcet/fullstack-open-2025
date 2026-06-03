import { Link, Outlet } from 'react-router-dom'
import Togglable from '../components/Togglable'
import LoginForm from '../components/LoginForm'

const BaseLayout = ({ user }) => {
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
      {!user && loginSection()}
      <div>
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/blogs">Blogs</Link>
        <Link style={padding} to="/create">Create</Link>
      </div>
      <Outlet />
    </>
  )
}

export default BaseLayout