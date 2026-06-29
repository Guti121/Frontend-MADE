import { useEffect, useState } from "react";
import { getTypeContainers } from "../../services/container.service";

export default function TypeContainerSelect({
  value,
  onChange,
}) {
  const [typeContainers, setTypeContainers] =
    useState([]);

  useEffect(() => {
    console.log("useEffect executed");
    loadTypeContainers();
  }, []);

  const loadTypeContainers = async () => {
    try {
      console.log("eee")
      const result = await getTypeContainers({});
      console.log(result.data)
      setTypeContainers(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        Tipo de containere
      </label>

      <select
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">
          Todos los tipos
        </option>

        {typeContainers.map((type) => (
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