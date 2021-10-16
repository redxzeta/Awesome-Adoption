import { Card, Image } from "react-bootstrap";
import "./profile.css";
const Profile = () => {
  return (
    <div className="profile__container">
      <h1>My Stories</h1>
      <div className="story__container">
        <Image src="https://via.placeholder.com/150x150" roundedCircle />
        <p>@username</p>
      </div>
      <div className="d-flex flex-row">
        <Card className="card__container">
          <Card.Header>Featured</Card.Header>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint commodi repudiandae consequuntur
              voluptatum labo Impedit sit sunt quaerat
            </Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
        <Card className="card__container">
          <Card.Header>Featured</Card.Header>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint commodi repudiandae consequuntur
              voluptatum laborum numquitecto voluptate aliquam nihil,
            </Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
