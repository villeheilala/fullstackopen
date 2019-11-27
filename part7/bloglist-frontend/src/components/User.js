import React from 'react'

const User = ({ name, blogs }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{blogs}</td>
    </tr>
  )
}

export default User
