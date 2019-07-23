import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'

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
    author
    published
    id
  }
}
`

const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String, $published: Int, $genres: [String]) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author
    published
    genres
    id
  }
}
`

const EDIT_BIRTHYEAR = gql`
mutation editBirthyear($author: String!, $born: Int!) {
  editAuthor(name: $author, setBornTo: $born)  {
    name
    born
  }
}
`

const App = () => {
  const [page, setPage] = useState('authors')
  const authors = useQuery(GET_ALL_AUTHORS)
  const books = useQuery(GET_ALL_BOOKS)
  console.log(books)

  const handleError = (error) => {
    console.log(error)
  }

  const [addBook, { error, data }] = useMutation(CREATE_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: GET_ALL_BOOKS }, { query: GET_ALL_AUTHORS }]
  })

  const [editBirthYear] = useMutation(EDIT_BIRTHYEAR, {
    onError: handleError,
    refetchQueries: [{ query: GET_ALL_AUTHORS }]
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      {(page === 'authors') ? <Authors result={authors} editBirthYear={editBirthYear}  /> : null}

      {(page === 'books') ? <Books result={books} /> : null}

      {(page === 'add') ? <NewBook addBook={addBook} /> : null}

    </div>
  )
}

export default App