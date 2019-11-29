import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'

const GET_ALL_AUTHORS = gql`
query getAllAuthors{
  allAuthors  {
    name
    born
    bookCount
    id
  }
}
`

const GET_ALL_BOOKS = gql`
query getAllBooks{
  allBooks  {
    title
    author {
      name
      born
    }
    published
    genres
    id
  }
}
`

const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int, $genres: [String]) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres,
  ) {
    title
    author {
      name
    }
    published
    genres
    id
  }
}
`

const EDIT_BIRTHYEAR = gql`
mutation editBirthyear($author: String!, $born: Int!) {
  editAuthor(
    name: $author,
    setBornTo: $born
  ) {
    name
    born
  }
}
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const authors = useQuery(GET_ALL_AUTHORS)
  const books = useQuery(GET_ALL_BOOKS)
  const client = useApolloClient()

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const [addBook, { error, data }] = useMutation(CREATE_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: GET_ALL_BOOKS }, { query: GET_ALL_AUTHORS }]
  })

  const [editBirthYear] = useMutation(EDIT_BIRTHYEAR, {
    onError: handleError,
    refetchQueries: [{ query: GET_ALL_AUTHORS }]
  })

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const errorNotification = () => errorMessage &&
  <div style={{ color: 'red' }}>
    {errorMessage}
  </div>

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? <button onClick={() => setPage('add')}>add book</button> : null}
        {!token ? <button onClick={() => setPage('login')}>login</button> : null}
        {token ? <button onClick={() => logout()}>logout</button> : null}
      </div>

      {errorNotification()}

      {(page === 'authors') ? <Authors result={authors} editBirthYear={editBirthYear} token={token}/> : null}

      {(page === 'books') ? <Books result={books} /> : null}

      {(page === 'add') ? <NewBook addBook={addBook} /> : null}

      {(page === 'login') ? <LoginForm login={login} setToken={(token) => setToken(token)} setPage={setPage} /> : null}

    </div>
  )
}

export default App