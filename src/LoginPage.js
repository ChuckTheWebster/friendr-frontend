import React from 'react';
import LoginForm from './LoginForm';
import Card from 'react-bootstrap/Card';

/** User login page
 *
 * Props:
 * - login
 *
 * RoutesList -> LoginPage -> LoginForm
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
    <Card>
      <Card.Body>
        <Card.Title>Login</Card.Title>
        <LoginForm submit={login} prompts={prompts} />
      </Card.Body>
    </Card>
  );
}

export default LoginPage;