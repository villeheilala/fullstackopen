import React, { useState } from 'react'

const Authors = ({ result, editBirthYear, token }) => {
  const [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')
//  if (!show) {
//    return null
//  }

  if (result.loading) return <div>loading...</div>

  const updateAuthor = async (e) => {
    e.preventDefault()
    console.log("update author")
    await editBirthYear({
      variables: {
        author,
        born,
      }
    })
    setAuthor('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {token ? <div>
      <h2>set birthyear</h2>
      <form onSubmit={updateAuthor}>
      <select onChange={({ target }) => setAuthor(target.value)}>
      {result.data.allAuthors.map(a =>
        <option
          key={a.id}
          value={a.name}>
          {a.name}
        </option>
      )}
      </select>
      <div>
        born
        <input
          type="number"
          value={born}
          onChange={({ target }) => setBorn(parseInt(target.value, 10))}
        />
      </div>
      <button type='submit'>update author</button>
      </form></div> : null}
    </div>
  )
}

export default Authors