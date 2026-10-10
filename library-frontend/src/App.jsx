import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))

  const onLogin = (value) => {
    setToken(value)
    localStorage.setItem('library-user-token', value)
    setPage('authors')
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add' && !!token} token={token} />

      <Login show={page === 'login' && !token} onLogin={onLogin} />
    </div>
  )
}

export default App
