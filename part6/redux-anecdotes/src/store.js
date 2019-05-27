import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationRecucer from './reducers/notificationReducer'

const reducer = combineReducers ({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  notification: notificationRecucer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store