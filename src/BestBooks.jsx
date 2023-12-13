import { useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import BookFormModal from './BookFormModal';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import EditFormModal from './EditFormModal';

/* TODO: Create a component called `BestBooks` that renders a Carousel of all the books in your database */
function BestBooks() {

  const [books, setBooks] = useState([]);
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [error, setError] = useState(null);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [, setForceRerender] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  async function getBooks() {
    try {
      const response = await axios.get('https://can-of-books-api-nr7r.onrender.com/books');
      setBooks(response.data);
      setLoadingBooks(false);
      setForceRerender({}); 
    } catch (error) {
      console.log(error);
      setError('Failed to fetch books.');
      setLoadingBooks(false);
    }

  }
  async function handleRemove(id) {
    try {
      const indexToRemove = books.findIndex((book) => book._id === id);
      const nextIndex = Math.min(indexToRemove, books.length - 2);
      setActiveIndex(nextIndex);

      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === id ? { ...book, loading: true } : book
        )
      );
      await axios.delete(`https://can-of-books-api-nr7r.onrender.com/books/${id}`);
      const updatedBooks = books.filter((book) => book._id !== id);
      setBooks(updatedBooks);
    } catch (error) {
      console.log(error);
      setError('Failed to remove the book.');
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === id ? { ...book, loading: false } : book
        )
      );
    }
  }

  function handleEdit(book) {
    setEditBook(book);
    setEditShow(true);
  }

  useEffect(() => {
    getBooks();
  }, [books]);

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
      {loadingBooks ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Retrieving books...</span>
        </Spinner>
      ) : (
        <>
          {error && <Alert variant="danger">{error}</Alert>}
          {books.length ? (
            <Carousel 
            activeIndex={activeIndex}
            onSelect={(index) => setActiveIndex(index)}
            >
              {books.map((book) => (
                <Carousel.Item className="carousel-item-book" key={book._id}>
                  <h3>{book.title}</h3>
                  <p>{book.description}</p>
                  <p>{book.status}</p>
                  <Button
                    disabled={book.loading}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(book._id);
                    }}
                  >
                    {book.loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Removing...
                      </>
                    ) : (
                      'Remove'
                    )}
                  </Button>
                  <Button variant="secondary" onClick={() => handleEdit(book)}>Update</Button>
                  {editShow && <EditFormModal
                    show={editShow}
                    setShow={setEditShow}
                    book={editBook}
                    setBooks={setBooks}
                  />}
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <h3>No Books Found :(</h3>
          )}
        </>
      )}
    </>
  )
}


export default BestBooks;
