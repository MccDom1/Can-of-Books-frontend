
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import BookForm from './BookForm';
export default function BookFormModal(props) {

  const handleClose = () => props.setShow(false);

  async function addBook(Book) {
    try {
      const response = await axios.post('https://can-of-books-api-nr7r.onrender.com/books', Book);
      props.setBooks((prev) => [...prev, response.data]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add A New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookForm
            addBook={addBook}
            handleClose={handleClose}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}