import { Card, Image } from "react-bootstrap";

function Profile() {
  return (
    <>
      <h1>My Stories</h1>
      <Image src="https://via.placeholder.com/150x150" roundedCircle />
      <div className="d-flex flex-row">
        <Card style={{ width: "18rem", margin: "1rem" }}>
          <Card.Img variant="top" src="https://via.placeholder.com/150x150" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>Lorem lorem</Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem", margin: "1rem" }}>
          <Card.Img variant="top" src="https://via.placeholder.com/150x150" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>Lorem lorem</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Profile;
