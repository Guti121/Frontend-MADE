import { useEffect, useState } from "react";
import { getStockContainer } from "../../services/stockContainer.service";

export default function ContainerSearchSelect({location_id, onSelect }) {
  const [search, setSearch] = useState("");
  const [containers, setContainers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, [search]);

  const load = async () => {
    try {
      setLoading(true);
      const result = await getStockContainer({id:location_id ,name: search, page: 1, limit: 10 });
      setContainers(result.data || result);
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
        placeholder="Buscar envase..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 text-sm"
      />
      {loading ? (
        <p className="text-sm text-gray-400">Cargando...</p>
      ) : (
        <div className="border rounded-lg divide-y max-h-48 overflow-y-auto">
          {containers.length === 0 ? (
            <p className="p-3 text-sm text-gray-400">No se encontraron envases</p>
          ) : (
            containers.map((c) => (
              <button
                key={c.container_id}
                type="button"
                onClick={() => onSelect(c)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50"
              >
                <span className="font-medium">{c.container_name}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}