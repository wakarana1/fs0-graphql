import { useState, useEffect } from 'react'

const Books = (props) => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (!props.show) {
      return
    }

    fetch('http://localhost:4000', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            allBooks {
              id
              title
              author
              published
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((result) => setBooks(result.data.allBooks))
  }, [props.show])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
