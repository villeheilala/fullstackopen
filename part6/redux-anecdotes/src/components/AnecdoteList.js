import React from 'react'
import Filter from './Filter'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {
  showNotification,
  hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (id) => {
    //console.log('vote', id)
    props.voteAnecdote(id)
    const content = props.anecdotes.find(anecdote => anecdote.id === id).content
    props.showNotification(`You voted anecdote "${content}"`)
    setTimeout(() => {
      props.hideNotification()
    }, 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {props.anecdotesToShow.map(anecdote =>
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
  return anecdotes.filter(a => a.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
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
 showNotification,
 hideNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)