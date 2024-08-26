import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Books({ token }) {
  const [books, setBooks] = useState([])

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books')
        const data = await response.json()
        setBooks(data.books)
      } catch (error) {
        console.error('Error fetching books:', error)
      }
    }
    fetchBooks()
  }, [])

  return (
    <div>
      <h2>Available Books</h2>
      <div className="books-grid">
        {books.map(book => (
          <div key={book.id} className="book-card">
            <img src={book.coverimage} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <Link to={`/books/${book.id}`}>View Details</Link>
            {token && book.available && (
              <button>Check Out</button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Books