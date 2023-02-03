import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function MessageForm({submit}) {

  const [text, setText] = useState('');

  function handleChange(event) {
    setText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    submit(text);
    setText('');
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="textbox">
        <Form.Label>Reply</Form.Label>
        <Form.Control value={text} onChange={handleChange} name="text" type="text" placeholder="Enter mssage" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
