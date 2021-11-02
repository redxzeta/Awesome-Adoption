import { useState } from "react";

const useForm = (state, submit = () => {}) => {
  const [form, setForm] = useState(state);

  const handleChange = (e) => {
    e.persist();
    setForm((val) => ({ ...val, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    submit();
  };

  const resetChanges = () => setForm(state);

  return [form, handleChange, onSubmit, resetChanges, setForm];
};

export default useForm;
