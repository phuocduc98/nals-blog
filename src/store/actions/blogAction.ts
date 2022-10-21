import { blogActionTypes } from './blogActionTypes'

export const fetchBlogsRequest = (param) => ({
  type: blogActionTypes.FETCH_BLOGS_REQUEST,
  payload: param
})

export const fetchBlogsSuccess = (blogs) => ({
  type: blogActionTypes.FETCH_BLOGS_SUCCESS,
  payload: blogs
})

export const fetchBlogsFailure = (error) => ({
  type: blogActionTypes.FETCH_BLOGS_FAILURE,
  payload: error
})

export const fetchBlogByIdRequest = (id) => ({
  type: blogActionTypes.FETCH_BLOG_BY_ID_REQUEST,
  payload: id
})

export const fetchBlogByIdSuccess = (blog) => ({
  type: blogActionTypes.FETCH_BLOG_BY_ID_SUCCESS,
  payload: blog
})

export const createBlog = (blog) => ({
  type: blogActionTypes.CREATE_BLOG,
  payload: blog
})

export const createBlogFailure = (error) => ({
  type: blogActionTypes.CREATE_BLOG_FAILURE,
  payload: error
})

export const updateBlog = (id, blog) => ({
  type: blogActionTypes.UPDATE_BLOG,
  payload: {
    id,
    blog
  }
})

export const updateBlogFailure = (error) => ({
  type: blogActionTypes.UPDATE_BLOG_FAILURE,
  payload: error
})