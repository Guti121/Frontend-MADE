import { useEffect, useState } from "react";
import { getLocation } from "../../services/location.service";

export default function LocationSelect({
  value,
  onChange,
}) {
  const [locations, setLocations] =
    useState([]);

  useEffect(() => {
    console.log("useEffect executed");
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      console.log("eee")
      const result = await getLocation({});
      console.log(result.data)
      setLocations(result.data);
      console.log(locations)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        SEDE
      </label>

      <select
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">
          Todos los tipos
        </option>

        {locations.map((type) => (
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