/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

const useForm = <T extends Record<string, any>>(
  state: T,
  submit?: () => void
) => {
  const [form, setForm] = useState(state);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((val) => ({ ...val, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    submit?.();
  };

  const resetChanges = () => setForm(state);

  return [form, handleChange, onSubmit, resetChanges, setForm];
};

export default useForm;
