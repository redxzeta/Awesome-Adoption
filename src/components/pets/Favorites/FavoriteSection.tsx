import { useEffect, useState } from "react";
import { useDelete, useInsert } from "react-supabase";
import { AddNewFav, removeFavoritePet } from "reducers/supaFunctions";

import { useAuth } from "../../../context/SupaContext";
import FavoriteButton from "../../layout/FavoriteButton";

const FavoriteSection = ({ id }: { id: string }) => {
  const [{ fetching }, execute] = useInsert("favoritepets");
  const { user, session, favoritePets, dispatch } = useAuth();
  const [status, setStatus] = useState(false);
  const [removalId, setRemovalId] = useState<number>(0);
  if (!session || !user) return null;
  const [{ fetching: deleteFetching }, executeDelete] =
    useDelete("favoritepets");
  const addFav = async () => {
    const { data } = await execute({
      favoriter: user.id,
      pet: id,
    });
    dispatch(AddNewFav(data[0]));
  };

  const removeFav = async () => {
    await executeDelete((query) => query.eq("id", removalId), {
      returning: "minimal",
      count: "estimated",
    });
    dispatch(removeFavoritePet(removalId));
  };
  useEffect(() => {
    const checkFav = favoritePets.some((el) => el.pet === id);
    if (checkFav && favoritePets) {
      setStatus(true);
      const letId = favoritePets.filter((fav) => fav.pet === id)[0].id;
      setRemovalId(letId);
    } else {
      setStatus(false);
      setRemovalId(0);
    }
  }, [id, favoritePets]);

  return (
    <FavoriteButton
      loading={fetching || deleteFetching}
      add={addFav}
      remove={removeFav}
      status={status}
    />
  );
};
export default FavoriteSection;
