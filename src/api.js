import axios from "axios";

const BASE_URL = process.env.REACT_APP_FLASK_BACKEND_BASE_URL || "http://localhost:5001";

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

    console.log("URL=", url);
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
    return res;
  }

  /** Register user */

  static async registerUser(data) {

    const response = await axios({
      method: "post",
      url: `${BASE_URL}/auth/register`,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.token;
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

  /** Fetches potential friends */

  static async findFriends(username) {
    const response = await this.request(`matcher/${username}`);
    console.log("getUsersForMatcher", response)
    return response.users;
  }

  /** Updates a match status */

  static async updateLike(data) {
    const response = await this.request('likes', data, "post");
    console.log("response=", response);
    return response.data;
  }

  /** Fetches matched users */

  static async getMatches(username) {
    const response = await this.request(`matches/${username}`);
    return response.user;
  }

  /** Sends a message */

  static async sendMessage(data) {
    const username = data.username
    const response = await this.request(`users/${username}/messages`, data, "post");
    return response.message
  }



}


export default FriendrApi;