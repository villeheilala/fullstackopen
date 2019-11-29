import React, { useState } from 'react'

const Books = ({ show, result }) => {
  const [showGenres, setShowGenres] = useState('all genres')

  if (show) {
    return null
  }

  if (result.loading) return <div>loading...</div>

  const genres = [...new Set(Array.prototype.concat.apply([], result.data.allBooks.map(book => book.genres))), "all genres"]

  const filteredBooks = showGenres === 'all genres' ? result.data.allBooks : result.data.allBooks.filter(book => book.genres.includes(showGenres))

  return (
    <div>
      <h2>books</h2>
      showing books in <strong>{showGenres}</strong>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {genres.map(genre => <button onClick={() => setShowGenres(genre)} key={genre} name={genre} type="button">{genre}</button>)}
      </div>
    </div>
  )
}

export default Books