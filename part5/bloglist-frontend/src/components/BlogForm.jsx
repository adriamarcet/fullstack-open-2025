import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const registerNewBlog = event => {
        event.preventDefault()

        createBlog({
            title: title,
            author: author,
            url: url
        })

        setTitle('')
        setAuthor('')
        setUrl('')
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
            <button className="button" type="submit">Add new blog</button>
            </form>
    )
}

export default BlogForm