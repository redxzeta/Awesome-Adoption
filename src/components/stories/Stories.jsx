import userData from "./UserData";
import { Link } from "react-router-dom";
import { Row, Button } from "react-bootstrap";
import UserCard from "../layout/UserCard";
import "./Stories.css";
export default function Stories() {
  return (
    <div className="stories">
      <div className="main_title">
        <h1>User Story</h1>
        <Button className="story_btn" as={Link} to={"/404/"}>
          Create your Story
        </Button>
      </div>
      <Row className="mb-2 w-100 petList">
        {userData && userData.map((u) => <UserCard key={u.id} userData={u} />)}
      </Row>
    </div>
  );
}
