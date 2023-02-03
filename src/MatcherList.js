import React from 'react';
import { useState, useEffect, useContext } from "react";
import FriendrApi from './api';
import ListGroup from 'react-bootstrap/ListGroup';
import MatcherListCard from "./MatcherListCard";
import userContext from "./userContext";


/**
 * Renders Matcher List
 *
 * State:
 * - matchUsers
 *
 * Context:
 * - user
 */

export default function MatcherList() {

  const [matchUsers, setMatchUsers] = useState({
    isLoading: true,
    users: []
  });

  const user = useContext(userContext);

  const current_user = user.user.data.username;


  console.log("MatchrList user=", current_user);

  useEffect(function fetchAndSetUsers() {
    async function fetchUsers() {
      const resp = await FriendrApi.findFriends(current_user);

      console.log("resp=", resp);

      setMatchUsers(({
        isLoading: false,
        users: resp
      }));
    }
    fetchUsers();
  }, []);

  async function handleSwipe(otherUsername, isLiked) {

    await FriendrApi.updateLike({
      "u1": current_user,
      "u2": otherUsername,
      "like_status": isLiked
    });

    // not a good idea to filter on the frontend, but good enough for now

    const filterUsers = matchUsers.users.filter(matchUser => matchUser.username !== otherUsername);

    setMatchUsers({ isLoading: false, users: filterUsers });
  }


  if (matchUsers.isLoading) return "loading...";

  return (
    <div>
      <h1>Dashboard - Find Friends</h1>

      <ListGroup>
        <MatcherListCard items={matchUsers.users} handleSwipe={handleSwipe} />

        {matchUsers.users.length === 0 && <ListGroup.Item>
          <h2>No more users. Please check later.</h2>
        </ListGroup.Item>}
      </ListGroup>
    </div>
  );
}

