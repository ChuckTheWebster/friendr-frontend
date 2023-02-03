import React from 'react'
import {Card, Button} from "react-bootstrap";

export default function MatcherCard({img, username, name, bio, distance, handleSwipe}) {

  function handleDislike(evt) {
    evt.preventDefault();
    console.log("username", username);
    console.log("name", name)
    const isLiked = false;
    handleSwipe(username, isLiked)
  }

  function handleLike(evt) {
    evt.preventDefault();
    const isLiked = true;
    handleSwipe(username, isLiked)
  }

  return (
    <Card className="mx-auto my-3">
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <hr/>
        <Card.Text>
          Distance: {distance}
        </Card.Text>
        <Card.Text>
          <small>Bio: {bio}</small>
        </Card.Text>

        <Button variant="secondary" onClick={handleDislike}>Dislike</Button>
        <Button variant="primary" onClick={handleLike}>Like</Button>
      </Card.Body>
    </Card>
  );
}
