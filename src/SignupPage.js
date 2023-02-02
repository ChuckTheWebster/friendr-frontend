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
      name: 'first_name'
    },
    {
      label: 'Last Name',
      name: 'last_name'
    },
    {
      label: 'Email',
      name: 'email'
    },
    {
      label: 'Image',
      name: 'file'
    },
    {
      label: 'Location',
      name: 'location'
    },
    {
      label: 'Bio',
      name: 'bio'
    },
    {
      label: 'Friend Radius (Miles)',
      name: 'friend_radius'
    }
  ];

  return (
    <div>
      <div className="SignupPage mx-auto mt-4 mb-2">
        <h1>Sign Up</h1>
        <hr />
        <UserForm submit={signup} prompts={prompts} />
      </div>
    </div>
  );
}

export default SignupPage;