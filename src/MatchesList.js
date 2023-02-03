import React, { useState, useEffect, useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import MatchesCard from './MatchesCard';
import userContext from './userContext';
import { BASE_URL } from './api'

export default function MatchesList() {

  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(userContext);

  console.log("user", user);

  useEffect(() => {
    fetch(`${BASE_URL}/matches/${user.data.username}`)
      .then(res => res.json())
      .then(data => {
        setIsLoading(false);
        setMatches(data);
      }
      );
  }, []);


  if (isLoading) return <h1>Loading...</h1>;

  console.log("matches=", matches);

  return (
    <>
      <h1>MatchesList</h1>

      <ListGroup>
        {matches.matches.map(match => <MatchesCard match={match} />)}
      </ListGroup>
      {matches.matches.length === 0 && <h1>You haven't matched with anyone yet :S</h1>}
    </>


  );
}
