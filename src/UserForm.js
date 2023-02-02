import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import "./UserForm.css";

/** Form with customizable prompts and submit.
 *
 * State:
 * - formData: object of form input name: value pairs
 *    -messages: Array of string error messages to display
 *
 * Props:
 * - prompts: an array of objects as prompts for inputs
 *            { label, name }
 * - submit:  function called upon submit
 *
 * { LoginPage, SignupPage } -> UserForm
 */

function UserForm({ prompts, submit }) {
  let initialFormState = {};

  for (let prompt of prompts) {
    initialFormState[prompt.name] = "";
  }

  const [formData, setFormData] = useState(initialFormState);

  /** Update form input. */
  function handleChange(evt) {
    // let img;

    // if(evt.target.files){
    //   img = evt.target.files[0]
    //   console.log("picture was added")
    // }

    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
      // "image_url": img
    }));
  }

  console.log("image=", formData.image_url)

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();

    console.log("in handleSubmit");
    console.log("data=", formData)

    submit(formData);
  }

  function renderInputType(name){
    if(name === "password") return `password`
    if(name === "image_url") return `file`
    return `text`
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
              type={renderInputType(p.name)}
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

              // {p.name === "password" && type="password"}


              // type={p.name === "password" ? "password" : "text"}


export default UserForm;
