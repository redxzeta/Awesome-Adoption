/* eslint-disable */
// @ts-nocheck
import { FetchingButton } from "components/layout/Buttons/FetchingButton";
import { PawHubContainer } from "components/layout/Grid/PetCardFlex";
import React, { useState } from "react";
import { Form, Input } from "react-daisyui";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useClient } from "react-supabase";

type PasswordType = {
  newPassword: string;
  confirmation: string;
};

const handleValidatePassword = ({
  newPassword,
  confirmation,
}: PasswordType) => {
  if (newPassword !== confirmation) {
    return "Passwords should be equal";
  } else if (newPassword.length < 8) {
    return "Passwords should be more than 8 characters";
  }
  return "";
};

const ResetPassword = () => {
  const { control, handleSubmit, register } = useForm<PasswordType>();
  const { auth } = useClient();
  const session = auth.session();
  const [errorMsg, setErrorMsg] = useState("");
  const handleOnSubmit = async (data) => {
    setLoading(true);

    const errorMessage = handleValidatePassword(data);
    if (!errorMessage) await handleResetPassword(data.newPassword);
    setErrorMsg(errorMessage);
    setLoading(false);
  };

  const [loading, setLoading] = useState(false);

  if (!session) {
    return <Navigate to="/" />;
  }

  const handleResetPassword = async (password) => {
    const { error: err } = await auth.api.updateUser(
      auth.currentSession.access_token,
      { password }
    );
    alert(err?.message ? err.message : "Password updated");
  };

  return (
    <PawHubContainer>
      <section
        className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
        fluid="md"
      >
        <div className="max-w-md w-full space-y-8 shadow-2xl rounded-xl p-6">
          <h1 className="text-5xl font-bold font-amatic">Reset Password</h1>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Form className="w-full p-4">
              <Form.Label>Enter new password</Form.Label>
              <Controller
                name="newPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="New password"
                    bordered
                    type="password"
                    color="primary"
                    className="flex min-w-[10px] "
                    {...register("newPassword", {
                      required: true,
                    })}
                  />
                )}
              />
            </Form>
            <Form className="w-full  p-4">
              <Form.Label>Confirm new password</Form.Label>
              <Controller
                name="confirmation"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="New password"
                    bordered
                    type="password"
                    color="primary"
                    className=" flex min-w-[10px] "
                    {...register("confirmation", {
                      required: true,
                    })}
                  />
                )}
              />
            </Form>

            <FetchingButton action="Reset Password" />

            {errorMsg && <small className="text-danger">{errorMsg}</small>}
          </form>
        </div>
      </section>
    </PawHubContainer>
  );
};

export default ResetPassword;
