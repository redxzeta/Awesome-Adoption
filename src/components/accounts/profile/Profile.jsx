import { useState } from "react";
import { Image, Spinner } from "react-bootstrap";
import { useFilter, useSelect } from "react-supabase";
import "./profile.css";
const sampleUsername = "jjVYG46RTL1BpOOaTYuU";
const Profile = () => {
  const [userName, setUserName] = useState(sampleUsername);
  const filter = useFilter(
    (query) => query.eq("username", userName).single(),
    [userName]
  );
  const [{ data, fetching }] = useSelect("profiles", {
    filter,
  });

  let x = "";
  if (fetching) {
    x = (
      <div className="profile__img blank">
        <h2>Loading</h2>
      </div>
    );
  } else if (!data) {
    console.log("test");
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
  return (
    <main className="profile__section">
      <section className="banner" />
      {x}
      <button
        onClick={() =>
          setUserName((x) =>
            x === sampleUsername ? "8r4lRtrSEomxFPvVFMy9" : sampleUsername
          )
        }
      >
        change usernMame
      </button>
      {fetching ? (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      ) : (
        "DONE"
      )}
    </main>
  );
};

export default Profile;
