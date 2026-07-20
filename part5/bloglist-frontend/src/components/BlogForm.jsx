import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Stack, Button, Container } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const navigate = useNavigate()
  const registerNewBlog = async event => {
    event.preventDefault()

    await createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')

    navigate('/')
  }

  return (
    <Container maxWidth="sm">
      <form className="form-card" onSubmit={registerNewBlog}>
        <Stack spacing={2}>
          <TextField
            id="blogTitle"
            label="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <TextField
            id="blogAuthor"
            label="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <TextField
            id="blogUrl"
            label="Blog Url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <div>
            <Button variant="contained" type="submit">Add blog</Button>
          </div>
        </Stack>
      </form>
    </Container>
  )
}

export default BlogForm