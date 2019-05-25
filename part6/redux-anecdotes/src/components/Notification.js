import React from 'react';

const Notification = ({ store }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  return (
    <div>
    {store.getState().notification ?
    <div style={style}>
      {store.getState().notification}
    </div> : ''
    }
    </div>
  )
}

export default Notification
