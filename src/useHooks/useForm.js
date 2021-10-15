import { useState } from "react";

const useForm = (state, submit) => {
  const [form, setForm] = useState(state);

  const handleChange = (e) => {
    e.persist();
    setForm((val) => ({ ...val, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const x = submit();
    console.log(x);
  };

  return [form, handleChange, onSubmit];
};

export default useForm;
