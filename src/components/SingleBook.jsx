import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './SingleBook.css'

function SingleBook({ token }) {
  const [book, setBook] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`)
        setBook(response.data)
      } catch (error) {
        console.error('Error fetching book:', error)
      }
    }
    fetchBook()
  }, [id])

  const checkoutBook = async () => {
    if (!token) {
      alert('You must be logged in to check out a book')
      return
    }
    try {
      await axios.patch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`,
        { available: false },
        { headers: { 'Authorization': `Bearer ${token}` } }
      )
      setBook({ ...book, available: false })
    } catch (error) {
      console.error('Error checking out book:', error)
    }
  }

  if (!book) return <div>Loading...</div>

  return (
    <div className="single-book-container">
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Description: {book.description}</p>
      <p>Available: {book.available ? 'Yes' : 'No'}</p>
      {book.available && token && (
        <button onClick={checkoutBook}>Check Out</button>
      )}
    </div>
  )
}

export default SingleBook