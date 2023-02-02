import React from 'react';
import UserForm from './UserForm';
import Card from 'react-bootstrap/Card';
// import "./SignupPage.css"

/** User signup page
 *
 * Props:
 * - signup
 *
 * RoutesList -> SignupPage -> UserForm
 */

function SignupPage({ signup }) {
  const prompts = [
    {
      label: 'Username',
      name: 'username'
    },
    {
      label: 'Password',
      name: 'password'
    },
    {
      label: 'First Name',
      name: 'firstName'
    },
    {
      label: 'Last Name',
      name: 'lastName'
    },
    {
      label: 'Email',
      name: 'email'
    }
  ];

  return (
    <div>
      <div className="SignupPage mx-auto mt-4 mb-2">
        <h1>Sign Up</h1>
        <hr/>
        <UserForm submit={signup} prompts={prompts} />
      </div>
    </div>
  );
}

export default SignupPage;