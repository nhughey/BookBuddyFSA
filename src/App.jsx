import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import bookLogo from './assets/books.png'
import Books from './components/Books'
import Login from './components/Login'
import Register from './components/Register'
import Account from './components/Account'

function App() {
  const [token, setToken] = React.useState(localStorage.getItem('token'));

  const handleSetToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const appStyles = {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  };

  const headerStyles = {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const h1Styles = {
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    fontSize: '24px',
    color: '#333',
  };

  const logoStyles = {
    width: '40px',
    marginRight: '10px',
  };

  const navStyles = {
    display: 'flex',
    gap: '15px',
  };

  const linkStyles = {
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 'bold',
  };

  const buttonStyles = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  };

  return (
    <Router>
      <div style={appStyles}>
        <header style={headerStyles}>
          <h1 style={h1Styles}>
            <img id='logo-image' src={bookLogo} alt="Book Logo" style={logoStyles}/>
            Library App
          </h1>
          <nav style={navStyles}>
            <Link to="/" style={linkStyles}>Home</Link>
            {token ? (
              <>
                <Link to="/account" style={linkStyles}>Account</Link>
                <button onClick={handleLogout} style={buttonStyles}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" style={linkStyles}>Login</Link>
                <Link to="/register" style={linkStyles}>Register</Link>
              </>
            )}
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Books token={token} />} />
          <Route path="/books/:id" element={<Books token={token} />} />
          <Route path="/login" element={<Login setToken={handleSetToken} />} />
          <Route path="/register" element={<Register setToken={handleSetToken} />} />
          <Route path="/account" element={<Account token={token} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App