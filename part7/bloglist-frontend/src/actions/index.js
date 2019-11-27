/*
 * action types
 */

 export const SET_NOTIFICATION = 'SET_NOTIFICATION';
 export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';
 export const SET_BLOGS = 'SET_BLOGS';
 export const SET_USER = 'SET_USER';

/*
 * action creators
 */

export const setNotification = (type, message) => ({
  type: SET_NOTIFICATION,
  payload: { type, message, },
})

export const clearNotification = () => ({
  type: CLEAR_NOTIFICATION,
})

export const setBlogs = (blogs) => ({
  type: SET_BLOGS,
  payload: { blogs },
})

export const setUser = (user) => ({
  type: SET_USER,
  payload: { user },
})
