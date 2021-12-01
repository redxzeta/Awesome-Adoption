import { useState } from "react";

const useForm = (state, submit = () => {}) => {
  const [form, setForm] = useState(state);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((val) => ({ ...val, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    submit();
  };

  const resetChanges = () => setForm(state);

  return [form, handleChange, onSubmit, resetChanges, setForm];
};

export default useForm;
