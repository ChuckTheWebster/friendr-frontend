import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const BASE_URL = "http://127.0.0.1:5001"
// http://127.0.0.1:5000

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class FriendrApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;

    console.log("URL=", url)
    const headers = { Authorization: `Bearer ${FriendrApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Login user */
  static async loginUser(data) {
    const res = await this.request("auth/token", data, "post");
    console.log(res);
    return res;
  }

  /** Register user */
  static async registerUser(data) {
    console.log("register user data=", data)
    const res = await this.request("auth/register", data, "post");
    console.log("res=", res)

    return res.token;
  }

    /** Get a user by username */
    static async getUser(username) {
      const response = await this.request(`users/${username}`);
      return response.user;
    }

  /** Update user info */

  static async updateUser(data, username) {
    const res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }


}
// async function test() {
//   const resp = await JoblyApi.registerUser({username: "sunce", firstName: "Sunce", password: "password", lastName: "Juravic", email: "sunce@cat.com"});
//   console.log("resp=", resp);
// }
// test();

export default FriendrApi;