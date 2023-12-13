import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function EditForm(props) {
  function handleSubmit(e) {
    e.preventDefault();
    const {
      title,
      editFormDescription,
      editFormStatus
    } = e.target.elements;

    props.editBook({
      title: title.value,
      description: editFormDescription.value,
      status: editFormStatus.value
    })
  }

  return (
    <Form onSubmit={(e) => {
      handleSubmit(e);
    }}>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder={props.title}
          name="title"
          defaultValue={props.title}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="editFormDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Description"
          name="description"
          defaultValue={props.description}
        />
      </Form.Group>
      <Form.Select id="editFormStatus" name="status" defaultValue={props.status}>
        <option value="Read">Read</option>
        <option value="Unread">Unread</option>
      </Form.Select>
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
}