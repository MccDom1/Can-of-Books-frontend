
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';

export default function BookForm(props) {
    function handleSubmit(event) {
        event.preventDefault();
        const {
            BookFormTitle,
            BookFormDescription,
            status
        } = event.target.elements;
        console.log(BookFormTitle.value, BookFormDescription.value, status.value);

        const title = String(BookFormTitle.value);
        const description = String(BookFormDescription.value);
        const statuss = String(status.value);

        props.addBook({
            title,
            description,
            status: statuss
        })
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