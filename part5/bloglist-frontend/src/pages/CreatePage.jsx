import { Link } from 'react-router-dom'
import BlogForm from '../components/BlogForm'

const CreatePage = ({ user, addBlog }) => {
  const handleAddBlog = addBlog

  const blogFormSection = () => (
    <BlogForm createBlog={handleAddBlog} />
  )

  return (
    <>
      <h1>Create a new Blog Entry</h1>
      {user && (
        <div className='loginBox stack'>
          <p>{user.username} logged in.</p>
          {blogFormSection()}
        </div>
      )}
      {!user && (
        <div>
          <p>You have to be logged in. Please go to Log In page.</p>
          <Link className='btn secondary' to="/login">Log in</Link>
        </div>
      )}
    </>
  )
}

export default CreatePage