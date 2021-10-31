import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./UserCard.css";
import nameCleaner from "../../utils/nameCleaner";
import storyCleaner from "../../utils/storyCleaner";

export default function UserCard(props) {
  const { id, photos, name, description, story } = props.userData;

  return (
    <Col md={6} xs={12} key={id} className="card-container">
      <Card className="card">
        <Card.Body className="card__body">
          <div className="profile_Section">
            <img src={photos} alt={name} className="card__img" />
            <span className="card__title">{nameCleaner(name)}</span>
            <br />
            <span className="card__title desc">{nameCleaner(description)}</span>
          </div>
          <div className="story_Section">
            <div className="story">{storyCleaner(story)}</div>
            <Button className="card__btn" as={Link} to={"/404/"}>
              More Info
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
