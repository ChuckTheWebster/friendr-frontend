import React from 'react';
import { Button, ListGroupItem } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

export default function MatchesCard({ match }) {

  const navigate = useNavigate();

  // other user
  const { username } = useParams()

  function handleClick() {
    navigate(`/matches/${match.username}/messages`);
  }

  return (
    <ListGroupItem className='d-flex justify-content-between align-items-center'>
      <div>
        <h3>{match.username}</h3>
        <p>{match.bio}</p>
        <img src={match.image} alt={match.username} height={50} />
      </div>
      <Button onClick={ handleClick }>Message</Button>
    </ListGroupItem>
  );
}
