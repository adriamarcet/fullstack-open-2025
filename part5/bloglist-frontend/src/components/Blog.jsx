const Blog = ({ blog }) => (
  <div className="blog-item">
    <div className="blog-title">{blog.title}</div>
    <div className="blog-author">{blog.author}</div>
  </div>
)

export default Blog