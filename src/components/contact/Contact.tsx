import { PawHubContainer } from "components/layout/Grid/PetCardFlex";
import { SubmitHandler, useForm } from "react-hook-form";

import { EmailInput, MessageInput, NameInput } from "./Inputs";

interface FormData {
  names: string;
  email: string;
  message: string;
}

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  const inputClasses = errors.names
    ? "input input-error text-lg w-full max-w-3xl bg-white my-2"
    : "input input-bordered text-lg w-full max-w-3xl bg-white my-2";

  return (
    <PawHubContainer>
      <section>
        <h1 className="font-amatic text-5xl font-bold py-10">Contact Us</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form-control max-w-lg"
        >
          <label className="text-lg">
            Names
            <NameInput
              register={register}
              inputClasses={inputClasses}
              errors={errors}
            />
          </label>

          <label className="text-lg">
            Email
            <EmailInput
              register={register}
              inputClasses={inputClasses}
              errors={errors}
            />
          </label>

          <label htmlFor="message" className="text-lg py-2">
            Message
          </label>
          <MessageInput register={register} errors={errors} />

          <button className="btn btn-primary rounded-full w-28 mt-4">
            Submit
          </button>
        </form>
      </section>
    </PawHubContainer>
  );
};

export default Contact;
