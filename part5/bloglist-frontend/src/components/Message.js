import React from 'react'

let info = {
    color: 'green'
}

let warning = {
    color: 'red'
}

const Message = ({ text, type }) => (
  <div style={type === "warning" ? warning : info}>
    <p>{text}</p>
  </div>
)

export default Message