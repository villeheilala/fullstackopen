import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {
  showNotification,
  hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ store }) => {
  const vote = (id, content) => {
    //console.log('vote', id)
    notify(`You voted anecdote "${content}"`, 5000)
    store.dispatch(
      voteAnecdote(id)
    )
  }

  const notify = (notification, duration) => {
    store.dispatch(showNotification(notification))
    setTimeout(() => {
      store.dispatch(hideNotification())
    }, duration)
  }

  const filterAnecdotes = () => {
    const anecdotes = store.getState().anecdotes
    const filter = store.getState().filter
    return anecdotes.filter(a => a.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {filterAnecdotes().map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>)}
    </div>
  )
}

export default AnecdoteForm