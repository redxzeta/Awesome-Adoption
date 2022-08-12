import { FetchingButton } from "components/layout/Buttons/FetchingButton";
import { PawHubContainer } from "components/layout/Grid/PetCardFlex";
import { Form, Input } from "react-daisyui";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useSignUp } from "react-supabase";

import { useAuth } from "../../context/SupaContext";

type RegisterType = {
  email: string;
  password: string;
};

const Register = () => {
  const { control, handleSubmit, register } = useForm<RegisterType>();
  const [{ error, fetching, user }, signUp] = useSignUp();

  const onSubmit: SubmitHandler<RegisterType> = async (data) =>
    await signUp(data);
  const { session } = useAuth();
  if (session) return <Navigate to="/" />;
  return (
    <PawHubContainer>
      {user ? (
        <Success />
      ) : (
        <section className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 shadow-2xl rounded-xl p-6">
            <h1 className="text-5xl font-bold font-amatic">Sign Up</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Form className="  w-full  p-4">
                <Form.Label title="Email Address">
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter Email"
                        bordered
                        type="email"
                        color="primary"
                        className=" max-w-xs"
                        {...register("email", {
                          required: true,
                          maxLength: 45,
                        })}
                      />
                    )}
                  />
                </Form.Label>
              </Form>

              <Form className="w-full p-4">
                <Form.Label title="Password">
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter Password"
                        bordered
                        color="primary"
                        type="password"
                        className=" max-w-xs"
                        {...register("password", { required: true })}
                      />
                    )}
                  />
                </Form.Label>
              </Form>

              <FetchingButton fetching={fetching} action="Submit" />
              {error && (
                <small className="text-error" test-id="formErrorMessage">
                  {error.message}
                </small>
              )}
            </form>
          </div>
        </section>
      )}
    </PawHubContainer>
  );
};

export default Register;

const Success = () => (
  <div>
    <h1>Success</h1>
    <p>Check Email to confirm your account</p>
  </div>
);
