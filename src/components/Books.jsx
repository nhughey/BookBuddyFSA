import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import './Books.css'

function Books({ token }) {
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filterText, setFilterText] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true)
      try {
        const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books')
        const data = await response.json()
        setBooks(data.books)
        setFilteredBooks(data.books)
      } catch (error) {
        console.error('Error fetching books:', error)
        setError('Failed to fetch books. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchBooks()
  }, [])

  useEffect(() => {
    async function fetchBookDetails() {
      if (!id) return
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch book details')
        }
        const data = await response.json()
        setSelectedBook(data.book)
      } catch (error) {
        console.error('Error fetching book details:', error)
        setError('Failed to fetch book details. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchBookDetails()
  }, [id])

  useEffect(() => {
    if (filterText) {
      const filtered = books.filter(book => 
        book.title.toLowerCase().includes(filterText.toLowerCase()) ||
        book.author.toLowerCase().includes(filterText.toLowerCase())
      )
      setFilteredBooks(filtered)
    } else {
      setFilteredBooks(books)
    }
  }, [filterText, books])

  const handleCheckout = async (bookId) => {
    if (!token) {
      navigate('/login')
      return
    }

    try {
      const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ available: false })
      })

      if (!response.ok) {
        throw new Error('Failed to check out book')
      }

      setBooks(books.map(book => 
        book.id === bookId ? { ...book, available: false } : book
      ))

      if (selectedBook && selectedBook.id === bookId) {
        setSelectedBook({ ...selectedBook, available: false })
      }

    } catch (error) {
      console.error('Error checking out book:', error)
      setError('Failed to check out book. Please try again later.')
    }
  }

  const handleFilterChange = (e) => {
    setFilterText(e.target.value)
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  if (selectedBook) {
    return (
      <div className="single-book-container">
        <h2>{selectedBook.title}</h2>
        <img src={selectedBook.coverimage} alt={selectedBook.title} />
        <p>Author: {selectedBook.author}</p>
        <p>Description: {selectedBook.description}</p>
        <p>Available: {selectedBook.available ? 'Yes' : 'No'}</p>
        {token && selectedBook.available && (
          <button onClick={() => handleCheckout(selectedBook.id)}>Check Out</button>
        )}
        <Link to="/">Back to all books</Link>
      </div>
    )
  }

  return (
    <div className="books-container">
      <h2>Library Books</h2>
      <input
        type="text"
        className="book-filter"
        placeholder="Filter books by title or author"
        value={filterText}
        onChange={handleFilterChange}
      />
      <div className="books-grid">
        {filteredBooks.map(book => (
          <div key={book.id} className="book-card">
            <img src={book.coverimage} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>
              {book.available ? 'Available' : 'Not Available'}
            </p>
            <Link to={`/books/${book.id}`}>View Details</Link>
            {token && book.available && (
              <button onClick={() => handleCheckout(book.id)}>Check Out</button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Books