
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import BookForm from './BookForm';
export default function BookFormModal(props) {
    const [formData, setFormData] = useState({});
    
    const handleClose = () => props.setShow(false);

   async function addBook(Book){
    console.log(Book)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: Book
    };
    try {
        const response = await axios.post('https://can-of-books-api-nr7r.onrender.com/books', options);
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
                    addBook={addBook}/>
                </Modal.Body>
                <Modal.Footer>
                    
                </Modal.Footer>
            </Modal>
        </>
    );
}