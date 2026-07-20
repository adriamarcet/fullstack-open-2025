import { Link, Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AppBar, Button, Container, Toolbar, Typography, Box } from '@mui/material'
const BaseLayout = ({ user, handleLogOut }) => {
const style = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <>
      <header className="container-xl">
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                BLOGS
              </Typography>
              <Box>
                <Button color="inherit" component={Link} to="/" sx={style}>Home</Button>
                <Button color="inherit" component={Link} to="/blogs" sx={style}>Blogs</Button>
                <Button color="inherit" component={Link} to="/create" sx={style}>Create</Button>
                <Button color="inherit" component={Link} to="/login" sx={style}>
                  {user && (
                    <span>Profile</span>
                  )}
                  {!user && (
                    <span>Login</span>
                  )}
                </Button>
                {user && (
                  <Button color="inherit" onClick={handleLogOut} sx={style}>Log out</Button>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </header>
      <main className="container-xl margin-start-xl">
        <Toaster />
        <Outlet />
      </main>
    </>
  )
}

export default BaseLayout