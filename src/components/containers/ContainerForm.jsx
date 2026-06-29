import { useState } from "react";
import TypeContainerSelect from "./TypeContainerSelect";
import UnitBrandSelect from "../brand/UnitBrandSelect";
import Button from "../ui/Button";

export default function ContainerForm({ values, onChange, onSubmit }) {
  const [typeContainer, setTypeContainer] = useState(values.type_container || "");
  const [errors, setErrors] = useState({});

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setTypeContainer(value);
    setErrors((prev) => ({ ...prev, type_container: "" }));
    onChange({ target: { name: "type_container", value } });
  };

  const handleChange = (e) => {
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    onChange(e);
  };

  const validate = () => {
    const newErrors = {};

    if (!values.name || values.name.length < 2)
      newErrors.name = "Name is required (min 2 characters)";

    if (!values.type_container || Number(values.type_container) < 1)
      newErrors.type_container = "Type Container is required";

    if (!values.capacity || Number(values.capacity) < 1)
      newErrors.capacity = "Capacity is required";

    if (!values.unit)
      newErrors.unit = "Unit is required";

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
        <label className="block mb-1">Tipo de container</label>
        <TypeContainerSelect
          value={typeContainer}
          onChange={handleTypeChange}
        />
        {errors.type_container && (
          <p className="text-red-500 text-xs mt-1">{errors.type_container}</p>
        )}
      </div>

      {/* Capacity */}
      <div>
        <label className="block mb-1">Capacidad</label>
        <input
          type="number"
          name="capacity"
          min="1"
          value={values.capacity || ""}
          onChange={handleChange}
          placeholder="Ej: 500"
          className="w-full border p-3 rounded"
        />
        {errors.capacity && (
          <p className="text-red-500 text-xs mt-1">{errors.capacity}</p>
        )}
      </div>

      {/* Unit */}
      <div>
        <UnitBrandSelect
            value={values.unit || ""}
            onChange={(e) => {
                setErrors((prev) => ({ ...prev, unit: "" }));
                onChange({
                target: {
                    name: "unit",  // <-- force the name
                    value: e.target.value,
                },
                });
            }}
            />
        {errors.unit && (
          <p className="text-red-500 text-xs mt-1">{errors.unit}</p>
        )}
      </div>

      <Button type="submit">Crear</Button>

    </form>
  );
}