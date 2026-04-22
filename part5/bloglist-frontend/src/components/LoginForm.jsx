import { useState } from 'react'

const LoginForm = ({ submitAction }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = event => {
    event.preventDefault()

    submitAction({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-field">
        <label className="form-label" htmlFor="username">User name</label>
        <input
          className="form-input"
          id="username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="password">Password</label>
        <input
          className="form-input"
          id="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button className="button" type="submit">Submit</button>
    </form>
  )}

export default LoginForm