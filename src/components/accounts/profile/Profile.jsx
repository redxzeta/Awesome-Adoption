import { Image, Spinner } from "react-bootstrap";
import { useFilter, useSelect } from "react-supabase";
import "./profile.css";
const sampleUsername = "jjVYG46RTL1BpOOaTYuU";
const Profile = () => {
  const filter = useFilter((query) =>
    query.eq("username", sampleUsername).single()
  );
  const [{ data, fetching }] = useSelect("profiles", {
    filter,
  });

  if (fetching) return <Spinner />;
  return (
    <main className="profile__section">
      <section className="banner" />
      (
      <Image
        className="profile__img"
        roundedCircle
        src={data.avatar_url}
        alt={data.sampleUsername}
      />
      {data.username}
    </main>
  );
};

export default Profile;
