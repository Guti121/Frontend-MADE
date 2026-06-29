import { useNavigate } from "react-router-dom";
import { deleteTypeContainer } from "../../../services/typeContainer.service";

export default function TypeContainersTable({
  typeContainers,
  onDelete,
}) {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    console.log(id)
    const confirmed = window.confirm(
      "Are you sure you want to delete this container?"
    );

    if (!confirmed) return;

    try {
      
      await deleteTypeContainer(id);
      
      onDelete();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Error deleting container"
      );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-100">
            <th className="p-4 text-left">
              Nombre
            </th>

            <th className="p-4 text-left">
              Descripción 
            </th>

            <th className="p-4 text-left">
              Acciones 
            </th>
          </tr>
        </thead>

        <tbody>
          {typeContainers.map((typeContainer) => (
            <tr
              key={typeContainer.id}
              className="border-t cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={()=>navigate(`/type-container`)}
            >
              <td className="p-4">
                {typeContainer.name}
              </td>

              <td className="p-4 max-w-xs line-clamp-2">
                {typeContainer.description}
                </td>

              <td className="p-4">
                <div className="flex gap-3">
                

                  <button
                    onClick={() =>
                      handleDelete(
                        typeContainer.id
                      )
                    }
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}