// this reducer handles the state changes and forwards
// changes to service handling server connection

import anecdoteService from '../services/anecdotes'

/*
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
*/

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      const anecdotes = state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote)
      return anecdotes 
    case 'ADD_NEW':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    await anecdoteService.addVote(id)
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const addNewAnecdote = (content) => {
  return async (dispatch) => {
    const response = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD_NEW',
      data: {
        content,
        votes: 0,
        id: response.id
      }
    })
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer