import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import bookLogo from './assets/books.png'
import Books from './components/Books'

function App() {
  const [token, setToken] = React.useState(null)

  return (
    <Router>
      <div>
        <header>
          <h1><img id='logo-image' src={bookLogo} alt="Book Logo"/>Library App</h1>
          <nav>
            <Link to="/">Home</Link>
            {token ? (
              <>
                <Link to="/account">Account</Link>
                <button onClick={() => setToken(null)}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/login" element={<h2>Login Page</h2>} />
          <Route path="/register" element={<h2>Register Page</h2>} />
          <Route path="/account" element={<h2>Account Page</h2>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

/* import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import bookLogo from './assets/books.png'
import Books from './components/Books'
import SingleBook from './components/SingleBook'
import Login from './components/Login'
import Register from './components/Register'
import Account from './components/Account'

function App() {
  const [token, setToken] = useState(null)

  return (
    <Router>
      <div>
        <header>
          <h1><img id='logo-image' src={bookLogo} alt="Book Logo"/>Library App</h1>
          <nav>
            <Link to="/">Home</Link>
            {token ? (
              <>
                <Link to="/account">Account</Link>
                <button onClick={() => setToken(null)}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Books token={token} />} />
          <Route path="/books/:id" element={<SingleBook token={token} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route path="/account" element={<Account token={token} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App  */