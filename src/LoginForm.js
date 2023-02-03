import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

/** Renders our login form
 *
 * State:
 * - formData
 *
 * Props:
 * - prompts
 * - submit
 *
 * { LoginPage } -> LoginForm
 */


function LoginForm({ prompts, submit }) {
  let initialFormState = {};

  for (const prompt of prompts) {
    initialFormState[prompt.name] = "";
  }

  const [formData, setFormData] = useState(initialFormState);

  /** Update form input. */

  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));

  }

  /** Call parent function and clear form. */

  async function handleSubmit(evt) {
    evt.preventDefault();
    submit(formData);
    setFormData(initialFormState);
  }

  return (
    <>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        {prompts.map((p, i) => (
          <Form.Group className="mb-3" key={i}>
            <Form.Label htmlFor={p.name}>{p.label}</Form.Label>
            <Form.Control
              id={p.name}
              name={p.name}
              onChange={handleChange}
              value={formData[p.name]}
              type={p.name === "password" ? "password": "text"}
            />
          </Form.Group>
        ))}
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default LoginForm;
