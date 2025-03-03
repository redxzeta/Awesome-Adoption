import { FetchingButton } from "components/layout/Buttons/FetchingButton";
import { PawHubContainer } from "components/layout/Grid/PetCardFlex";
import { Form, Input } from "react-daisyui";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useClient } from "react-supabase-next";
import useSWR from "swr";
import { fetchSupaProfile } from "utils/supaFetcher";

import { useAuth } from "../../../context/SupaContext";

type SettingType = {
  username: string;
  description?: string;
};
export default function Settings() {
  const client = useClient();
  const navigate = useNavigate();
  const { username: profileSearch, user } = useAuth();

  const { error: errorProfile, data: profile } = useSWR(
    profileSearch ? [client, profileSearch] : null,
    fetchSupaProfile,
    { revalidateOnFocus: false }
  );

  const { control, handleSubmit, register } = useForm<SettingType>();

  if (errorProfile) {
    navigate("/");
  }
  if (!profile) return <h1>Loading</h1>;

  const onSubmit: SubmitHandler<SettingType> = async data => {
    await client
      .from("profiles")
      .update({
        description: data.description,
        username: data.username
      })
      .match({ id: user?.id });
  };

  return (
    <PawHubContainer>
      <section className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 shadow-2xl rounded-xl p-6">
          <h1 className="text-5xl font-bold font-amatic">Settings</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Form className="  w-full  p-4">
              <Form.Label title="Username:&ensp; ">
                <Controller
                  name="username"
                  control={control}
                  defaultValue={profile.username}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter your username"
                      bordered
                      type="text"
                      color="primary"
                      className=" flex min-w-[10px] max-w-xs"
                      {...register("username", {
                        required: true,
                        minLength: 4,
                        maxLength: 45
                      })}
                    />
                  )}
                />
              </Form.Label>
            </Form>

            <Form className="w-full p-4">
              <Form.Label title="Description:&ensp;">
                <Controller
                  name="description"
                  control={control}
                  defaultValue={profile.description}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter description"
                      bordered
                      color="primary"
                      type="text"
                      className=" flex min-w-[10px] max-w-xs"
                    />
                  )}
                />
              </Form.Label>
            </Form>

            <FetchingButton action="Submit" fetching={false} className="justify-content-center mt-3 mb-2" />
          </form>
        </div>
      </section>
    </PawHubContainer>
  );
}
