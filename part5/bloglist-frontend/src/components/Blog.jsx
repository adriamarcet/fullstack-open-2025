import { useState, useEffect } from 'react'
import Toggable from "./Toggleble"
import blogService from '../services/blogs'

const Blog = ({ blog, likeFn }) => {

  const increaseLike = () => {
    likeFn(blog)
  }

  return (
    <div className="blog-item">
      <p className="blog-title">
        <span>{blog.title}</span>
        {blog.author !== null && (
          <span> by <span className="blog-author">{blog.author}</span></span>
        )}
      </p>
      
      <Toggable buttonLabel="View more details">
        <div>
          <ul>
            <li>URL: {blog.url}</li>
            <li>Likes: {blog.likes} <button onClick={increaseLike}>Like</button></li>
            {blog.user !== null && <li>Entered by: {blog.user.name}</li>}
          </ul>
        </div>
      </Toggable>
    </div>
  )
}

export default Blog