import { useState } from "react";

import Button from "../../ui/Button";

export default function TypeContainerForm({ values, onChange, onSubmit }) {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    onChange(e);
  };

  const validate = () => {
    const newErrors = {};

    if (!values.name || values.name.length < 2)
      newErrors.name = "Name is required (min 2 characters)";

    if (!values.description || Number(values.description) < 1)
      newErrors.description = "Description is required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Name */}
      <div>
        <label className="block mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={values.name || ""}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      {/* Type container */}
      <div>
        <label className="block mb-1">Descripción</label>
        <input
          type="text"
          name="description"
          value={values.description || ""}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description}</p>
        )}
      </div>


      <Button type="submit">Crear</Button>

    </form>
  );
}