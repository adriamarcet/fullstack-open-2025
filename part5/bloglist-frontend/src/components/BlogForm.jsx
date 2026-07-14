import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    <form className="form-card" onSubmit={registerNewBlog}>
      <div className="form-field">
        <label className="form-label" htmlFor="blogTitle">Title</label>
        <input
          className="form-input"
          id="blogTitle"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="blogAuthor">Author</label>
        <input
          className="form-input"
          id="blogAuthor"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="blogUrl">URL/Website</label>
        <input
          className="form-input"
          id="blogUrl"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button className="button" type="submit">Add blog</button>
    </form>
  )
}

export default BlogForm