import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import userContext from "./userContext";

/** Renders FriendrNav Bar Component
 *
 * Props:
 * - logout: Function to log user out
 *
 * App -> FriendrNav
 */

function FriendrNav({ logout }) {

  let currentUser;

  const { user } = useContext(userContext);

  if (user.data) currentUser = user.data.username;

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">Friendr</Navbar.Brand>
        <Nav className="ms-auto">
          {!user.isLoggedIn && (
            <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
            </>
          )}

          {user.isLoggedIn && (
            <>
              <Nav.Link href={`/matcher/${currentUser}`}>Find friends</Nav.Link>
              <Nav.Link href={`/matches/${currentUser}`}>See matches</Nav.Link>
              <Button
                className='logoutBtn'
                onClick={(logout)}
                variant="light"
              >{`Logout`}</Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default FriendrNav;