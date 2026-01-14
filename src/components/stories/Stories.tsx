// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { PawHubContainer } from "components/layout/Grid/PetCardFlex";
import { Button } from "react-daisyui";

import { useAuth } from "../../context/SupaContext";

export default function Stories() {
  const { user } = useAuth();

  return (
    <PawHubContainer>
      <div className="stories">
        <div className="main_title">
          <h1>User Story</h1>
          {user ? (
            <Button className="story_btn">Create your Story</Button>
          ) : (
            <Button className="story_btn">Login</Button>
          )}
        </div>
      </div>
    </PawHubContainer>
  );
}
