import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import MatcherList from './MatcherList';
import SignupPage from './SignupPage';
// import ProfilePage from './ProfilePage';

import userContext from './userContext';

/** App Routes
 *
 * Props:
 * - signup: Function to register a user
 * - login: Function to authenticate a user
 *
 * App -> RoutesList
 */
function RoutesList({ signup, login }) {
  const { user } = useContext(userContext);

  console.log("user=", user)

  return (
    <Routes>
      <Route path="/" element={ <HomePage/> }/>
      { !user.isLoggedIn &&
        <>
          <Route path="/login" element={ <LoginPage login={ login }/> }/>
          <Route path="/signup" element={ <SignupPage signup={ signup }/> }/>
        </>
      }

      { user.isLoggedIn &&
        <>
          <Route path="/matcher" element={ <MatcherList/> }/>
        </>
      }

      <Route path="*" element={ <Navigate to='/'/> }/>
    </Routes>
  )
}

export default RoutesList