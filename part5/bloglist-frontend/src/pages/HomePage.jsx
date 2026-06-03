import { Toaster } from 'react-hot-toast'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'

const HomePage = ({user, blogs, blogFormRef, blog, logEvent, notifyError}) => {
    const addBlog = async blogObject => {
        try {
            const createdBlog = await blogService.create(blogObject)
            setBlogs(blogs.concat(createdBlog))
            logEvent(`Added blog: ${createdBlog.title} by ${createdBlog.author}`, 'blog')
            toast.success(`New ${createdBlog.title} blog added successfully.`)
        } catch (error) {
            const message = error.response?.data?.error || 'Could not add blog'
            notifyError(message)
        }

        blogFormRef.current.toggleVisibility()
    }
    
    const blogFormSection = () => (
        <Togglable buttonLabel="Add new Blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
        </Togglable>
    )
    const handleLogOut = () => {
        logEvent('User logged out', 'logout')
        window.localStorage.removeItem('loggedBlogListappUser')
        location.reload()
    }

    return (
        <>
            <div className="app-layout">
                <main className="main-content">
                <Toaster />
                {user && (
                    <div>
                    <div className='loginBox'>
                        <p>{user.username} logged in.</p><button onClick={handleLogOut}>Log out</button>
                    </div>
                    {blogFormSection()}
                    </div>
                )}
                <h2>Blogs List APP</h2>
                <p>Create your Blog List from create page</p>
                </main>
            </div>
        </>
    )
}

export default HomePage;