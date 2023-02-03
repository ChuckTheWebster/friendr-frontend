import React from 'react'
import {Card, Button} from "react-bootstrap";

export default function MatcherCard({img, name, bio, distance}) {
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

        <Button variant="secondary">Dislike</Button>
        <Button variant="primary">Like</Button>
      </Card.Body>
    </Card>
  );
}
