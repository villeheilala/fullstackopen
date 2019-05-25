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

export const showNotification = notification => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: { notification }
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}

export default notificationReducer