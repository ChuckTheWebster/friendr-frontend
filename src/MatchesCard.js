import React from 'react';
import { Button, ListGroupItem } from 'react-bootstrap';

export default function MatchesCard({ match }) {
  return (
    <ListGroupItem className='d-flex justify-content-between align-items-center'>
      <div>
        <h3>{match.username}</h3>
        <p>{match.bio}</p>
        <img src={match.image} alt={match.username} height={50} />
      </div>
      <Button>Message</Button>
    </ListGroupItem>
  );
}
