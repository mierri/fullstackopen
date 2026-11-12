import { create } from 'zustand'
import blogService from '../services/blogs'

const useBlogStore = create((set) => ({
  blogs: [],
  setBlogs: (blogs) => set({ blogs }),
  fetchBlogs: async () => {
    const blogs = await blogService.getAll()
    set({ blogs })
  },
  createBlog: async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject)
    set((state) => ({
      blogs: state.blogs.concat(returnedBlog),
    }))
    return returnedBlog
  },
  likeBlog: async (id, blogObject) => {
    const updatedBlog = await blogService.update(id, blogObject)
    set((state) => ({
      blogs: state.blogs.map((b) => (b.id !== id ? b : updatedBlog)),
    }))
    return updatedBlog
  },
  removeBlog: async (id) => {
    await blogService.remove(id)
    set((state) => ({
      blogs: state.blogs.filter((b) => b.id !== id),
    }))
  },
  addComment: async (id, comment) => {
    const updatedBlog = await blogService.addComment(id, comment)
    set((state) => ({
      blogs: state.blogs.map((b) => (b.id !== id ? b : updatedBlog)),
    }))
    return updatedBlog
  },
}))

export default useBlogStore
