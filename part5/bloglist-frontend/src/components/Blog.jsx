const Blog = ({ blog, updateBlog, removeBlog, currentUser }) => {
  if (!blog) {
    return null
  }

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user ? blog.user.id : null
    }
    updateBlog(blog.id, updatedBlog)
  }

  const handleRemove = () => {
    removeBlog(blog.id)
  }

  const isCreator = blog.user && currentUser && blog.user.username === currentUser.username

  return (
    <div className="blog">
      <h2>{blog.title} {blog.author}</h2>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>
        likes {blog.likes}
        {currentUser && <button onClick={handleLike}>like</button>}
      </div>
      <div>added by {blog.user ? blog.user.name : 'unknown'}</div>
      {isCreator && (
        <button style={{ backgroundColor: 'lightblue' }} onClick={handleRemove}>remove</button>
      )}
    </div>
  )
}

export default Blog