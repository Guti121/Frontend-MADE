import { useEffect, useState } from "react";
import { getTypeComponents } from "../../services/Component.service";

export default function TypeComponentSelect({
  value,
  onChange,
}) {
  const [typeComponents, setTypeComponents] =
    useState([]);

  useEffect(() => {
    console.log("useEffect executed");
    loadTypeComponents();
  }, []);

  const loadTypeComponents = async () => {
    try {
      console.log("eee")
      const result = await getTypeComponents({});
      console.log(result.data)
      setTypeComponents(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        Tipo de componente
      </label>

      <select
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">
          Todos los tipos
        </option>

        {typeComponents.map((type) => (
          <option
            key={type.id}
            value={type.id}
          >
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
}