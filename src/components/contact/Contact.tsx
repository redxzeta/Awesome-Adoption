import { PawHubContainer } from "components/layout/Grid/PetCardFlex";
import { SubmitHandler, useForm } from "react-hook-form";

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

  return (
    <PawHubContainer>
      <section className="border-2  min-h-screen">
        <h1 className="font-amatic text-5xl font-bold py-10">Contact Us</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form-control max-w-xl"
        >
          <label htmlFor="names" className="text-lg pb-2">
            Names
          </label>
          <input
            placeholder="Names"
            {...register("names", {
              required: "This field is required.",
              maxLength: 50,
              minLength: 8,
            })}
            className="py-2 px-4 rounded-lg"
          />
          <div className="py-4 text-red-500">
            {errors && <span>{errors.names?.message}</span>}
            {errors.names?.type === "minLength" && (
              <span> Enter atleast 8 characters</span>
            )}
          </div>

          <label htmlFor="email" className="text-lg pb-2">
            Email
          </label>
          <input
            placeholder="Email"
            {...register("email", {
              required: "This field is required.",
              pattern: /^\S+@\S+$/i,
            })}
            className="py-2 px-4 rounded-lg"
          />
          <div className="py-4 text-red-500">
            {errors && <span>{errors.email?.message}</span>}
          </div>

          <label htmlFor="message" className="text-lg pb-2">
            Message
          </label>
          <textarea
            {...register("message", { required: "This field is required." })}
            className="text-lg py-2 px-4 rounded-lg"
            placeholder="Message"
          />
          <div className="py-4 text-red-500">
            {errors && <span>{errors.message?.message}</span>}
          </div>

          <button className="btn-primary rounded-full w-28 py-2 my-6 text-base font-bold cursor-pointer">
            Submit
          </button>
        </form>
      </section>
    </PawHubContainer>
  );
};

export default Contact;
