import React from 'react' 
import { connect } from 'react-redux'

const Notification = ({ type, message }) => {
  if (message === null) {
    return null
  }

  const style = {
    color: type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    type: state.notification.type,
    message: state.notification.message,
  }
}

const ConnectedNotification = connect(
  mapStateToProps)(Notification)

export default ConnectedNotification