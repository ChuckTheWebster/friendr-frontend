import React from 'react';
import LoginForm from './LoginForm';
import Card from 'react-bootstrap/Card';
// import "./LoginPage.css";

/** User login page
 *
 * Props:
 * - login
 *
 * RoutesList -> LoginPage -> UserForm
 */

function LoginPage({ login }) {

  const prompts = [
    {
      label: "Username",
      name: "username"
    },
    {
      label: 'Password',
      name: 'password'
    }
  ];

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <LoginForm submit={login} prompts={prompts} />
        </Card.Body>
      </Card>
    </div>
  );
}

export default LoginPage;