/* eslint-disable prettier/prettier */
import { Image, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFilter, useSelect } from "react-supabase";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";

import "./profile.css";
import { useAuth } from "../../../context/SupaContext";

const Profile = () => {
  // const [userName, setUserName] = useState(sampleUsername);

  const { username } = useAuth();
  const filter = useFilter(
    (query) => query.eq("username", username).single(),
    [username]
  );
  const [{ data, fetching }] = useSelect("profiles", {
    filter,
  });
  const [showModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let x = "";
  if (fetching || !data) {
    x = (
      <div className="profile__img blank">
        <h2>Loading</h2>
      </div>
    );
  } else {
    x = (
      <Image
        src={data.avatar_url}
        className="profile__img"
        alt="username"
        roundedCircle
      />
    );
  }
  const initialState = data && {
    username: data.username,
    description: data.description,
    avatar_url: data.avatar_url,
  };
  return (
    <main className="profile__section">
      <Image
        src="https://images.pexels.com/photos/9754/mountains-clouds-forest-fog.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        className="banner"
        fluid
      />
      {x}

      {data && data.username}

      <small>{data && data.description}</small>

      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      {data && (
        <EditProfileModal
          show={showModal}
          handleClose={handleClose}
          initialState={initialState}
        ></EditProfileModal>
      )}
      <Link to="">
        <Button className="mt-5 px-5" variant="primary">
          New Story
        </Button>
      </Link>

      <Container className="story-card">
        <Row>
          <Col sm={4}>
            <Image
              src="https://images.pexels.com/photos/9754/mountains-clouds-forest-fog.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              fluid
            />
          </Col>
          <Col sm={8}>
            <div className="card-body">
              <h1 className="story-title">This is title of story</h1>
              <p>
                <b>Last Updated -</b> 30 October 2021
              </p>
              <p className="story-body">
                Auto-layout for flexbox grid columns also means you can set the
                width of one column and have the sibling columns automatically
                resize around it. You may use predefined grid classes (as shown
                below), grid mixins, or inline widths. Note that the other
                columns will resize no matter the width of the center column.
              </p>
              <Button variant="primary">Read more</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Profile;
