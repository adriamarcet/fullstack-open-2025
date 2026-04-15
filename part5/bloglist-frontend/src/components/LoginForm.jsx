  const LoginForm = ({
   handleSubmit,
   handleUsernameChange,
   handlePasswordChange,
   username,
   password
  }) => (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-field">
        <label className="form-label" htmlFor="username">User name</label>
        <input
          className="form-input"
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="password">Password</label>
        <input
          className="form-input"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button className="button" type="submit">Submit</button>
    </form>
  )

  export default LoginForm