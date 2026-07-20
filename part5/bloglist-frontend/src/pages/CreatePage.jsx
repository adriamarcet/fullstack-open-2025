import { Link } from 'react-router-dom'
import BlogForm from '../components/BlogForm'
import { TextField, Button } from '@mui/material'

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
          <Button color="inherit" variant='contained' href="/login">Log in</Button>
        </div>
      )}
    </>
  )
}

export default CreatePage