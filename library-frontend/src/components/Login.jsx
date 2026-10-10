import { useState } from 'react'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    const res = await fetch('http://localhost:4000', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation ($username: String!, $password: String!) {
            login(username: $username, password: $password) {
              value
            }
          }
        `,
        variables: { username, password },
      }),
    })
    const result = await res.json()

    // wrong credentials are not handled yet
    if (result.data?.login) {
      props.onLogin(result.data.login.value)
      setUsername('')
      setPassword('')
    }
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="username">name</label>
          <input
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
