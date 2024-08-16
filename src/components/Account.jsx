import { useState, useEffect } from 'react'
import axios from 'axios'

function Account({ token }) {
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(
          'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations',
          { headers: { 'Authorization': `Bearer ${token}` } }
        )
        setReservations(response.data)
      } catch (error) {
        console.error('Error fetching reservations:', error)
      }
    }

    if (token) {
      fetchReservations()
    }
  }, [token])

  const returnBook = async (reservationId) => {
    try {
      await axios.delete(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${reservationId}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      )
      setReservations(reservations.filter(res => res.id !== reservationId))
    } catch (error) {
      console.error('Error returning book:', error)
    }
  }

  if (!token) return <div>Please log in to view your account.</div>

  return (
    <div>
      <h2>Your Account</h2>
      <h3>Your Reservations</h3>
      {reservations.length === 0 ? (
        <p>You have no reservations.</p>
      ) : (
        <ul>
          {reservations.map(reservation => (
            <li key={reservation.id}>
              {reservation.title} by {reservation.author}
              <button onClick={() => returnBook(reservation.id)}>Return</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Account