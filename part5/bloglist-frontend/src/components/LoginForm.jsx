import { useState } from 'react'
import { Stack, TextField, Button } from '@mui/material'
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
        <Stack spacing={2}>
          <TextField
            label="User name"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <TextField
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <div>
            <Button color="inherit" variant='contained' type="submit">Submit</Button>
          </div>
        </Stack>
      </div>
    </form>
  )}

export default LoginForm