import { useEffect, useState } from "react";
import { getStock } from "../../services/stock.service";

export default function ComponentSearchSelect({ location_id,onSelect }) {
  const [search, setSearch] = useState("");
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, [search]);

  const load = async () => {
    try {
      setLoading(true);
      const result = await getStock({id:location_id, name: search, page: 1, limit: 10 });
      setComponents(result.data || result);
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
        placeholder="Buscar componente..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 text-sm"
      />
      {loading ? (
        <p className="text-sm text-gray-400">Cargando...</p>
      ) : (
        <div className="border rounded-lg divide-y max-h-48 overflow-y-auto">
          {components.length === 0 ? (
            <p className="p-3 text-sm text-gray-400">No se encontraron componentes</p>
          ) : (
            components.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => onSelect(c)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50"
              >
                <span className="font-medium">{c.component_name}</span>
                <span className="font-medium">{c.component_id}</span>

              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}