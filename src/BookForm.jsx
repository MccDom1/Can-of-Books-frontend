
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';

export default function BookForm(props) {

    const [formData, setFormData] = useState({});
    function handleSubmit(event) {
        event.preventDefault();
        const {
            BookFormTitle,
            BookFormDescription,
            status
        } = event.target.elements;
        console.log(BookFormTitle.value, BookFormDescription.value, status.value);

        const title = BookFormTitle.value
        const description = BookFormDescription.value
        const statuss = status.value

        setFormData({
            title: { title },
            description: { description},
            status: { statuss}
        });
        console.log(formData);
        props.addBook(formData)
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="BookFormTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="BookFormDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter Description" />
            </Form.Group>
            <Form.Select id="status">
                <option disabled>Read Or Unread</option>
                <option value="Read">Read</option>
                <option value="Unread">Unread</option>
            </Form.Select>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}