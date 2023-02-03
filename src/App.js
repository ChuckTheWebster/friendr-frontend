import "./App.css";
// import FriendrNav from "./FriendrNav";
import RoutesList from "./RoutesList";
import { BrowserRouter } from "react-router-dom";
import FriendrApi from "./api";
import { useEffect, useState } from "react";
import decode from "jwt-decode";
import { Container } from "react-bootstrap";
import userContext from "./userContext";
import FriendrNav from "./FriendrNav";

const DEFAULT_USER_STATE = {
  data: null,
  isLoggedIn: false,
  hasLoaded: false
};


/** Friendr App
 *
 * State:
 * -user: Object containing information on current user and logged in state
 *    -data: User information { username, firstName, lastName, isAdmin, jobs }
 *        where jobs is { id, title, companyHandle, companyName, state }
 *    -isLoggedIn: Boolean for whether a user is logged in
 * -token: user token
 *
 * App -> { FriendrNav, RoutesList }
 */

function App() {
  const [user, setUser] = useState(DEFAULT_USER_STATE);
  const [token, setToken] = useState();

  /** Attempt to login previous user from localstorage */

  useEffect(function checkForTokenOnMount() {
    const tokenFromLocalStorage = localStorage.getItem("token");

    if (tokenFromLocalStorage) {
      storeToken(tokenFromLocalStorage);
    } else {
      setToken(null);
    }
  }, []);

  /** Update user state whenever token changes */

  useEffect(
    function updateUserOnTokenChange() {
      async function fetchAndSetUserInformation() {

        if (token === undefined) return;

        if (token === null) {
          setUser({
            data: null,
            isLoggedIn: false,
            hasLoaded: true
          });

          return;
        }

        const { username } = decode(token);

        let userFromAPI;

        try {
          userFromAPI = await FriendrApi.getUser(username);
        } catch (err) {
          console.error(err);
        }

        setUser({
          data: userFromAPI,
          isLoggedIn: true,
          hasLoaded: true
        });
      }

      fetchAndSetUserInformation();
    },
    [token]
  );

  /** On token change, add/remove token to/from local storage */

  useEffect(
    function updateTokenInLocalStorage() {
      if (token) {
        localStorage.setItem("token", token);
      } else if (token === null) {
        localStorage.removeItem("token");
      }
    },
    [token]
  );

  /** Register a user using the API and store the returned token */

  async function signup(signupFormData) {
    const tokenFromAPI = await FriendrApi.registerUser(signupFormData);
    console.log("signup token", tokenFromAPI);
    storeToken(tokenFromAPI);
  }


  /** Authenticate a user using the API and store the returned token */

  async function login(loginFormData) {
    const tokenFromAPI = await FriendrApi.loginUser(loginFormData);
    console.log("login token", tokenFromAPI);
    storeToken(tokenFromAPI);
  }

  /** Stores a token in the FriendrApi class, state, and localStorage */

  function storeToken(newToken) {
    FriendrApi.token = newToken;
    setToken(newToken);
  }

  /** Logout the user */

  function logout() {
    FriendrApi.token = null;
    setToken(null);
  }


  if (user.hasLoaded === false) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="App">
      <userContext.Provider value={{ user }}>
        <FriendrNav logout={logout} />
        <Container>
          <BrowserRouter>
            <RoutesList signup={signup} login={login} />
          </BrowserRouter>
        </Container>
      </userContext.Provider>
    </div>
  );
}

export default App;

