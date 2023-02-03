import React from 'react'
import { useState, useEffect, useContext } from "react";
import FriendrApi from './api';
import ListGroup from 'react-bootstrap/ListGroup';
import MatcherListCard from "./MatcherListCard";
//TODO: Context for user
import userContext from "./userContext";


export default function MatcherList() {

  const [matchUsers, setMatchUsers] = useState({
    isLoading: true,
    users: []
  });

  const user = useContext(userContext);

  const current_user = user.user.data.username


  console.log("MatchrList user=", current_user);

  useEffect(function fetchAndSetUsers() {
    async function fetchUsers() {
      const resp = await FriendrApi.findFriends(current_user);

      console.log("resp=", resp)

      setMatchUsers(({
        isLoading: false,
        users: resp
      }));
    }
    fetchUsers();
  }, []);

  async function handleSwipe(otherUsername, isLiked) {



    const response = await FriendrApi.updateLike({
      "u1": current_user,
      "u2": otherUsername,
      "like_status": isLiked
    });
  }
  //user1.username, user2.username, isLiked

  if (matchUsers.isLoading) return "loading...";


  return (
    <div>
      <ListGroup>
        <MatcherListCard items={matchUsers.users} handleSwipe={handleSwipe} />
      </ListGroup>
      {/* {matchUser.users.length === 0 && <h2>No users found.</h2>} */}
    </div>
  );
}

