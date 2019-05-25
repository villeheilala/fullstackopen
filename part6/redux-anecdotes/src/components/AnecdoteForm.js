import React from 'react'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import {
  showNotification,
  hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ store }) => {
  const addAnecdote = (event) => {
    const newAnecdote = event.target.anecdote.value
    notify(`You added anecdote ${newAnecdote}`, 5000)
    event.preventDefault()
    store.dispatch(
      addNewAnecdote(newAnecdote)
    )
    event.target.anecdote.value = ''
  }

  const notify = (notification, duration) => {
    store.dispatch(showNotification(notification))
    setTimeout(() => {
      store.dispatch(hideNotification())
    }, duration)
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

export default AnecdoteForm