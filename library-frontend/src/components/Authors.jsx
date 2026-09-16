import { useState, useEffect } from 'react'

const currentYear = new Date().getFullYear()
const birthYears = []
for (let y = currentYear; y >= 1000; y--) {
  birthYears.push(y)
}

const Authors = (props) => {
  const [authors, setAuthors] = useState([])
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const fetchAuthors = () => {
    fetch('http://localhost:4000', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            allAuthors {
              id
              name
              born
              bookCount
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((result) => setAuthors(result.data.allAuthors))
  }

  useEffect(() => {
    if (!props.show) {
      return
    }

    fetchAuthors()
  }, [props.show])

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    await fetch('http://localhost:4000', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation ($name: String!, $born: Int!) {
            editAuthor(name: $name, setBornTo: $born) {
              name
              born
            }
          }
        `,
        variables: {
          name,
          born: Number(born),
        },
      }),
    })

    setName('')
    setBorn('')
    fetchAuthors()
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="name">name</label>
          <select
            id="name"
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            <option value="">-- select author --</option>
            {authors.map((a) => (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="born">born</label>
          <input
            id="born"
            list="birth-years"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
          <datalist id="birth-years">
            {birthYears.map((y) => (
              <option key={y} value={y} />
            ))}
          </datalist>
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
