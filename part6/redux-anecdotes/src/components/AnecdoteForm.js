import React from 'react'
import { connect } from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import {
  showNotification,
  hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  
  const addAnecdote = (event) => {
    event.preventDefault()
    props.addNewAnecdote(event.target.anecdote.value)
    props.showNotification(`You added anecdote ${event.target.anecdote.value}`)
    setTimeout(() => {
      props.hideNotification()
    }, 5000)
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  addNewAnecdote,
  showNotification,
  hideNotification
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)