import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import EditForm from './EditForm';

export default function EditFormModal(props) {
  const handleClose = () => props.setShow(false);

  async function editBook(book) {
    try {
      const response = await axios.put(`https://can-of-books-api-nr7r.onrender.com/books/${props.book._id}`, book);
      props.setBooks((prevBooks) => {
        return prevBooks.map((prevBook) => {
          if (book._id === response.data._id) {
            return response.data;
          } else {
            return prevBook;
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
    handleClose();
  }

  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditForm 
            editBook={editBook}
            title={props.book.title}
            description={props.book.description}
            status={props.book.status}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}