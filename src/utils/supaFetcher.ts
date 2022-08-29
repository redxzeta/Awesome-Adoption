import { SupabaseClient } from "@supabase/supabase-js";
import { IProfileUpdate } from "reducers/supaReducer";

export type ProfileType = {
  avatar_url: string;
  description: string;
  background: {
    id: number;
    background_url: string;
  };
} & IProfileUpdate;

type bucketName = "profile";

export const fetchSupaProfile = async (
  client: SupabaseClient,
  profileSearch: string
) => {
  const { data, error } = await client
    .from<ProfileType>("profiles")
    .select("*, favoritepets(id,pet,created_at), background(*) ")
    .eq("username", profileSearch)
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 3;
  const from = page ? page * limit : 0;
  const to = page ? from + size - 1 : size - 1;

  return { from, to };
};

export const fetchSearchProfiles = async (
  client: SupabaseClient,
  page: number
) => {
  const { from, to } = getPagination(page, 10);
  const { data, error, count } = await client
    .from<ProfileType>("profiles")
    .select("*", { count: "exact" })
    .range(from, to);

  if (error) throw new Error(error.message);

  return { data, count };
};

export const fetchImage = async (
  supaClient: SupabaseClient,
  backgroundUrl: string,
  bucketName: bucketName,
  fallBack?: string
) => {
  const { data, error } = await supaClient.storage
    .from(bucketName)
    .download(backgroundUrl);

  if (error || !data) {
    return fallBack || error?.message;
  }

  return URL.createObjectURL(data);
};
