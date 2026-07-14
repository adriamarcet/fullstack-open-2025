import { Link, Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const BaseLayout = ({ user, handleLogOut }) => {
  const padding = { paddingRight: 5 }
  const separationStyle = { marginInlineStart: 'auto' }

  return (
    <>
      <header className="container-xl">
        <nav className="navbar">
          <ul>
            <li><Link style={padding} to="/">Home</Link></li>
            <li><Link style={padding} to="/blogs">Blogs</Link></li>
            <li><Link style={padding} to="/create">Create</Link></li>
            <li style={separationStyle}><Link to="/login">
              {user && (
                <span>Profile</span>
              )}
              {!user && (
                <span>Login</span>
              )}
            </Link></li>
            {user && (
              <li><button className="btn secondary" onClick={handleLogOut}>Log out</button></li>
            )}
          </ul>
        </nav>
      </header>
      <main className="container-xl margin-start-xl">
        <Toaster />
        <Outlet />
      </main>
    </>
  )
}

export default BaseLayout