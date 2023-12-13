import React, { useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import BookFormModal from './BookFormModal';
/* TODO: Create a component called `BestBooks` that renders a Carousel of all the books in your database */
function BestBooks() {

  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({});
  const [show, setShow] = useState(false);

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  async function getBooks() {
    try {
      const response = await axios.get('https://can-of-books-api-nr7r.onrender.com/books');
      setBooks(response.data);
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    getBooks();
  }, []);

  /* TODO: render all the books in a Carousel */

  return (
    <>
      <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
      <Button variant="primary" onClick={() => setShow(true)}>add book</Button>
      {show && <BookFormModal
        show={show}
        setShow={setShow}
        setBooks={setBooks}
      />}
      {books.length ? (
        <Carousel>
          {books.map((book) => (
            <Carousel.Item key={book._id}>
              {/* <img
                className="d-block w-100"
                src={book.cover}
                alt="Book Cover"
              /> */}

              <h3>{book.title}</h3>
              <p>{book.description}</p>
              <p>{book.status}</p>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <h3>No Books Found :(</h3>
      )}
    </>
  )
}


export default BestBooks;
