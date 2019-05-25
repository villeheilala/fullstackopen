import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({ store }) => {
  const vote = (id) => {
    //console.log('vote', id)
    store.dispatch(
      voteAnecdote(id)
    )
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {store.getState().map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>)}
    </div>
  )
}

export default AnecdoteForm