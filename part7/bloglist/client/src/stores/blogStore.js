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
}))

export default useBlogStore
