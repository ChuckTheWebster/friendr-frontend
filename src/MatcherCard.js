import React from 'react'
import {Card, Button} from "react-bootstrap";

/***
 * Renders a Matcher card
 *
 * Props:
 * - img
 * - username
 * - name
 * - bio
 * - distance
 * - handleSwipe
 */

export default function MatcherCard({img, username, name, bio, distance, handleSwipe}) {

  function handleDislike(evt) {
    evt.preventDefault();
    handleSwipe(username, false)
  }

  function handleLike(evt) {
    evt.preventDefault();
    handleSwipe(username, true)
  }

  return (
    <Card className="mx-auto my-3">
      <Card.Img variant="top" src={img} height={200} />
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
