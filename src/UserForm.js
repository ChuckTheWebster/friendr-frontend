import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
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
  const [selectedFile, setSelectedFile] = React.useState(null);

  /** Update form input. */
  function handleChange(evt) {
    let file;

    if(evt.target.files){
      file = evt.target.files[0]
      console.log("files=", evt.target.files)
      console.log("files[0]=", evt.target.files[0])

      console.log("picture was added")
    }

    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
      // "image_url": file
    }));
  }

  console.log("image=", formData.image_url)

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    const data = new FormData();

    data.append("first_name", formData.first_name)
    data.append("last_name", formData.last_name)
    data.append("username", formData.username)
    data.append("email", formData.email)
    data.append("password", formData.password)
    data.append("bio", formData.bio)
    console.log("evt.target",evt.target)
    console.log("evt.target.file", selectedFile);
    data.append("file", selectedFile)
    data.append("location", formData.location)
    data.append("friend_radius", formData.friend_radius)

    console.log("in handleSubmit");
    console.log("data=", data);

    try {
      const response = await axios({
        method: "post",
        url: "http://127.0.0.1:5001/auth/register",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch(error) {
      console.log(error)
    }
    // submit(data);
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }

  function renderInputType(name){
    if(name === "password") return `password`
    if(name === "file") return `file`
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
        <Form.Group className="mb-3" key="image">
          <Form.Label htmlFor="file">Image</Form.Label>
          <Form.Control
            id="file"
            name="file"
            onChange={handleFileSelect}
            type="file"
            />
        </Form.Group>
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default UserForm;
