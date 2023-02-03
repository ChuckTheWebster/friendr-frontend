import React from 'react'
import { useState, useEffect } from "react";
import FriendrApi from './api';
import ListGroup from 'react-bootstrap/ListGroup';
import MatcherListCard from "./MatcherListCard"


export default function MatcherList() {
  const [matchUser, setMatchUser] = useState({
    isLoading: true,
    users: []
  });

  useEffect(function fetchAndSetUsers() {
    async function fetchUsers() {
      const resp = await FriendrApi.getUsersForMatcher();

      console.log("resp=", resp)

      setMatchUser(({
        isLoading: false,
        users: resp
      }));
    }
    fetchUsers();
  }, []);



  if (matchUser.isLoading) return "loading...";


  return (
    <div>
      <ListGroup>
        <MatcherListCard items={matchUser.users} />
      </ListGroup>
      {/* {matchUser.users.length === 0 && <h2>No users found.</h2>} */}
    </div>
  );
}

