import { useState } from "react";
import TypeComponentSelect from "../../components/component/TypeComponentSelect";
import Button from "../ui/Button";

export default function ComponentForm({
  values,
  onChange,
  onSubmit,
}) {
  const [typeComponent, setTypeComponent] =
    useState(values.type_component || "");

  const handleTypeChange = (e) => {
    const value = e.target.value;

    setTypeComponent(value);

    onChange({
      target: {
        name: "type_component",
        value,
      },
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4"
    >
      <div>
        <label className="block mb-1">
          Name
        </label>

        <input
          type="text"
          name="name"
          value={values.name}
          onChange={onChange}
          className="w-full border p-3 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">
          Tipo de componente
        </label>

        <TypeComponentSelect
          value={typeComponent}
          onChange={handleTypeChange}
        />
      </div>

      <Button type="submit">
        Crear
      </Button>
    </form>
  );
}