import { useEffect, useState } from "react";
import { usePersistedState } from "../../hooks/usePersistedState";

export default function UnitBrandSelect({ value, onChange }) {
  const [brand] = usePersistedState("brand", {});
  const [units, setUnits] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUnits();
  }, [brand]);

  const loadUnits = () => {
    try {
      // <-- check if brand is empty
      if (!brand || Object.keys(brand).length === 0) {
        setError("No hay marca seleccionada.");
        setUnits([]);
        return;
      }

      setError("");

      if (!brand?.weight) {
        setUnits(["L", "ml"]);
      } else {
        setUnits(["kg", "g"]);
      }

    } catch (error) {
      console.log(error);
    }
  };

  if (error) {
    return (
      <div>
        <label className="block text-sm font-medium mb-1">Tipo de unidad</label>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-1">Tipo de unidad</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">Seleccione una unidad</option>
        {units.map((unit) => (
          <option key={unit} value={unit}>{unit}</option>
        ))}
      </select>
    </div>
  );
}