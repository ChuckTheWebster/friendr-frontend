import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


function UserForm({ prompts, submit }) {

  const navigate = useNavigate();

  let initialFormState = {};

  const data = new FormData();


  for (let prompt of prompts) {
    initialFormState[prompt.name] = "";
  }

  const [formData, setFormData] = useState(initialFormState);
  const [selectedFile, setSelectedFile] = React.useState(null);

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

    for(let fieldName in formData){
      data.append(fieldName, formData[fieldName])
    }
    data.append("file", selectedFile)

    try {
      submit(data)
      navigate("/")
    } catch(error) {
      console.log(error)
    }
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
