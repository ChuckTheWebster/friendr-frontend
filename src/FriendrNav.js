import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import userContext from "./userContext";

/** Renders JoblyNav Bar Component
 *
 * Props:
 * - logout: Function to log user out
 *
 * App -> JoblyNav
 */

// TODO: logout

function FriendrNav({ logout }) {
  const { user } = useContext(userContext);

  return (
    <Navbar bg="dark" variant="dark">
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
              <Nav.Link href="/matcher">Find friends</Nav.Link>
              <Nav.Link href="/matches">See matches</Nav.Link>
              <Button
                className='logoutBtn'
                onClick={logout}
                variant="light"
              >{`Logout: ${user.data.username}`}</Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default FriendrNav;