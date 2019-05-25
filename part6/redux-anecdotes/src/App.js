import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = (props) => {

  return (
    <div>
      <AnecdoteForm store={props.store} />
      <Notification store={props.store} />
      <Filter store={props.store} />
      <AnecdoteList store={props.store} />
    </div>
  )
}

export default App
