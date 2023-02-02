import "./App.css";
// import FriendrNav from "./FriendrNav";
import RoutesList from "./RoutesList";
import { BrowserRouter } from "react-router-dom";
import FriendrApi from "./api";
import { useEffect, useState } from "react";
import decode from "jwt-decode";
import { Container } from "react-bootstrap";

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

  // Attempt to login previous user from localstorage
  // useEffect(function checkForTokenOnMount() {
  //   const tokenFromLocalStorage = localStorage.getItem("token");
  //   if (tokenFromLocalStorage) {
  //     storeToken(tokenFromLocalStorage);
  //   } else {
  //     setToken(null);
  //   }
  // }, []);

  //   // Update user state whenever token changes
  //   useEffect(
  //     function updateUserOnTokenChange() {
  //       async function fetchAndSetUserInformation() {
  //         // Token has not been explicitly checked for yet
  //         if (token === undefined) return;

  //         // There is no token
  //         if (token === null) {
  //           setUser({
  //             data: null,
  //             isLoggedIn: false,
  //             hasLoaded: true
  //           });

  //           return;
  //         }

  //         // There is a token
  //         const { username } = decode(token);

  //         let userFromAPI;
  //         try {
  //           //TODO: Add method to FriendrApi (.getUser)
  //           // userFromAPI = await FriendrApi.getUser(username);
  //         } catch (err) {
  //           console.error(err);
  //         }
  //         setUser({
  //           data: userFromAPI,
  //           isLoggedIn: true,
  //           hasLoaded: true
  //         });
  //       }

  //       fetchAndSetUserInformation();
  //     },
  //     [token]
  //   );

  // // /** Register a user using the API and store the returned token */
  async function signup(signupFormData) {

    const tokenFromAPI = await FriendrApi.registerUser(signupFormData);
    console.log("token=", tokenFromAPI)
    // storeToken(tokenFromAPI);
  }

  // // /** Authenticate a user using the API and store the returned token */
  // async function login(loginFormData) {
  //   //TODO: Create FriendrApi
  //   // const tokenFromAPI = await FriendrApi.loginUser(loginFormData);
  //   // storeToken(tokenFromAPI);
  // }

  // /** Stores a token in the JoblyApi class, state, and localStorage */
  // function storeToken(newToken) {
  //   //TODO: Make sure FriendrApi has .token
  //   // FriendrApi.token = newToken;
  //   setToken(newToken);
  // }

  /** Save user edits using the API and update user state */
  // async function saveUserEdit(editFormData) {
  //   const { username, ...updateData } = editFormData;
  //   const userFromAPI = await JoblyApi.updateUser(username, updateData);
  //   setUser((prevUser) => ({
  //     isLoggedIn: true,
  //     hasLoaded: true,
  //     data: {
  //       ...prevUser.data,
  //       firstName: userFromAPI.firstName,
  //       lastName: userFromAPI.lastName,
  //       email: userFromAPI.email,
  //     },
  //   }));
  // }

  // if (user.hasLoaded === false) {
  //   return <h2>Loading...</h2>
  // }

  return (
    <div className="App">
      {/* <userContext.Provider value={{ user, saveUserEdit }}> */}
      <Container>
        <BrowserRouter>
          {/* <FriendlrNav logout={logout} /> */}
          <RoutesList  signup={signup} />
        </BrowserRouter>
      </Container>
      {/* </userContext.Provider> */}
    </div>
  );
}

// signup={signup}
// login={login}

export default App;

