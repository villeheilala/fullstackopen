const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data.notification
    case 'HIDE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (notification, duration) => {
  return async (dispatch) => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: { notification }
    })
    setTimeout(() => dispatch({ 
        type: 'HIDE_NOTIFICATION'
    }), duration * 1000)
  }
}

export default notificationReducer