import { useEffect, useState } from "react";
import { getFormulas } from "../../services/formula.service";
import { usePersistedState } from "../../hooks/usePersistedState";

export default function FormulaSearchSelect({ onSelect }) {
  const [location] = usePersistedState("selectedLocation", "");
  const [search, setSearch] = useState("");
  const [formulas, setFormulas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, [search]);

  const load = async () => {
    try {
      setLoading(true);
      const result = await getFormulas({ name: search, page: 1, limit:5 });
      console.log(result)
      setFormulas(result.data || result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="Buscar formula..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 text-sm"
      />
      {loading ? (
        <p className="text-sm text-gray-400">Cargando...</p>
      ) : (
        <div className="border rounded-lg divide-y max-h-48 overflow-y-auto">
          {formulas.length === 0 ? (
            <p className="p-3 text-sm text-gray-400">No se encontraron formulas</p>
          ) : (
            formulas.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => onSelect(f)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50"
              >
                <span className="font-medium">{f.name}---</span>
                <span className="font-medium">{f.final_quantity}/{f.unit}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}