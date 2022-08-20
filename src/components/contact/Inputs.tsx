interface InputProps {
  inputClasses?: string;
  register: any;
  errors: any;
}

export const NameInput = ({ register, inputClasses, errors }: InputProps) => {
  return (
    <>
      <input
        placeholder="Names"
        {...register("names", {
          required: "This field is required.",
          maxLength: 50,
          minLength: 6,
        })}
        className={inputClasses}
      />
      <div className="py-4 text-red-500">
        {errors && <span>{errors.names?.message}</span>}
        {errors.names?.type === "minLength" && (
          <span> Enter atleast 6 characters</span>
        )}
      </div>
    </>
  );
};

export const EmailInput = ({ inputClasses, register, errors }: InputProps) => {
  return (
    <>
      <input
        placeholder="Email"
        {...register("email", {
          required: "This field is required.",
          pattern: /^\S+@\S+$/i,
        })}
        className={inputClasses}
      />
      <div className="py-4 text-red-500">
        {errors && <span>{errors.email?.message}</span>}
        {errors.email?.type === "pattern" && (
          <span> Enter a valid email address</span>
        )}
      </div>
    </>
  );
};

export const MessageInput = ({ register, errors }: InputProps) => {
  return (
    <>
      <textarea
        {...register("message", { required: "This field is required." })}
        className={
          errors.message
            ? "textarea textarea-error h-40 text-lg bg-white rounded-lg"
            : "textarea textarea-bordered h-40 text-lg bg-white rounded-lg"
        }
        placeholder="Message"
        id="message"
      />
      <div className="py-4 text-red-500">
        {errors && <span>{errors.message?.message}</span>}
      </div>
    </>
  );
};
