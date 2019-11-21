/*
 * action types
 */

 export const SET_NOTIFICATION = 'SET_NOTIFICATION';
 export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';

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