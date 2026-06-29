import { useNavigate } from "react-router-dom";
import { deleteStockContainer } from "../../services/stockContainer.service";

export default function StockContainerTable({ stock, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    e.stopPropagation(); // <-- prevents row click when deleting
    console.log(id);
    const confirmed = window.confirm(
      "Are you sure you want to delete this stock?"
    );

    if (!confirmed) return;

    try {
      await deleteStockContainer(id);
      onDelete();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error deleting stock");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-100">
            <th className="p-4 text-left">Nombre</th>
            <th className="p-4 text-left">Tipo de stock</th>
            <th className="p-4 text-left">Cantidad Disponible</th>
            <th className="p-4 text-left">Unidad</th>
            <th className="p-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {stock.length > 0 ? (
            stock.map((stock) => (
              <tr
                key={stock.id}
                onClick={() => navigate(`/stocks/${stock.id}`)} // <-- row click
                className="border-t cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <td className="p-4">{stock.container_name}</td>
                <td className="p-4">{stock.type_container_name}</td>
                <td className="p-4">{stock.quantity_base}</td>
                <td className="p-4">ml o g</td>
                <td className="p-4">
                  <button
                    onClick={(e) => handleDelete(e, stock.id)} // <-- pass event
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                No existe stock en esta Ubicacion
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}