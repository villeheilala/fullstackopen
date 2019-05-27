import React from 'react'
import Filter from './Filter'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (id) => {
    //console.log('vote', id)
    props.voteAnecdote(id)
    const content = props.anecdotes.find(anecdote => anecdote.id === id).content
    props.setNotification(`You voted anecdote "${content}"`, 2)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotesToShow(props).map(anecdote =>
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

const anecdotesToShow = ({ anecdotes, filter }) => {
  const sortedAnecdotes = anecdotes.sort((a,b) => (
    a.votes > b.votes ? -1 : 0
  ))
  return sortedAnecdotes.filter(a => a.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: anecdotesToShow(state),
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
 voteAnecdote,
 setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)