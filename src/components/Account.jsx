import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import './Account.css'

function Account({ token }) {
  const [checkedOutBooks, setCheckedOutBooks] = useState([])
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    if (!token) return

    async function fetchUserData() {
      try {
        const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await response.json()
        setUserEmail(data.email)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    async function fetchCheckedOutBooks() {
      try {
        const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await response.json()
        setCheckedOutBooks(data.reservation)
      } catch (error) {
        console.error('Error fetching checked out books:', error)
      }
    }

    fetchUserData()
    fetchCheckedOutBooks()
  }, [token])

  if (!token) {
    return <Navigate to="/login" />
  }

  return (
    <div className="account-container">
      <h2>Account Information</h2>
      <p>Email: {userEmail}</p>
      
      <h3>Checked Out Books</h3>
      {checkedOutBooks.length === 0 ? (
        <p>You have 0 books checked out.</p>
      ) : (
        <ul>
          {checkedOutBooks.map(book => (
            <li key={book.id}>{book.title} by {book.author}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Account