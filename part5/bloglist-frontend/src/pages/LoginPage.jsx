import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { logEvent, notifyError } from '../helpers'

const LoginPage = ({ user, setUser, handleLogOut }) => {
  const navigate = useNavigate()

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogListappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      logEvent('User logged in', 'login')
      navigate('/')
    } catch (error) {
      const message = error.response?.data?.error || 'Wrong credentials'
      notifyError(message)
    }
  }

  const loginSection = () => (
    <section>
      <h2>Login</h2>
      <LoginForm submitAction={handleLogin} />
    </section>
  )

  return (
    <>
      {user ? (
        <section>
          <h2>Already logged in</h2>
          <p>Welcome back, {user.name || user.username}.</p>
          <button className="btn secondary" onClick={handleLogOut}>Log out</button>
        </section>
      ) : (
        loginSection()
      )}
    </>
  )
}

export default LoginPage