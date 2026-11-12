
const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const favorite = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorCount = {}

  blogs.forEach(blog => {
    if (authorCount[blog.author]) {
      authorCount[blog.author] += 1
    } else {
      authorCount[blog.author] = 1
    }
  })

  const mostBlogsAuthor = Object.keys(authorCount).reduce((a, b) => authorCount[a] > authorCount[b] ? a : b)

  return {
    author: mostBlogsAuthor,
    blogs: authorCount[mostBlogsAuthor]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorLikes = {}

  blogs.forEach(blog => {
    if (authorLikes[blog.author]) {
      authorLikes[blog.author] += blog.likes
    } else {
      authorLikes[blog.author] = blog.likes
    }
  })

  const mostLikesAuthor = Object.keys(authorLikes).reduce((a, b) => authorLikes[a] > authorLikes[b] ? a : b)

  return {
    author: mostLikesAuthor,
    likes: authorLikes[mostLikesAuthor]
  }
}

module.exports = {
  dummy,totalLikes, favoriteBlog, mostBlogs, mostLikes
}