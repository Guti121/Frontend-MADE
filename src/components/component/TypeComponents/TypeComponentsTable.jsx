import { useNavigate } from "react-router-dom";
import { deleteTypeComponent } from "../../../services/typeComponent.service";

export default function TypeComponentsTable({
  typeComponents,
  onDelete,
}) {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    console.log(id)
    const confirmed = window.confirm(
      "Are you sure you want to delete this component?"
    );

    if (!confirmed) return;

    try {
      
      await deleteTypeComponent(id);
      
      onDelete();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Error deleting component"
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
          {typeComponents.map((component) => (
            <tr
              key={component.id}
              className="border-t cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={()=>navigate(`/type-component`)}
            >
              <td className="p-4">
                {component.name}
              </td>

              <td className="p-4 max-w-xs line-clamp-2">
                {component.description}
                </td>

              <td className="p-4">
                <div className="flex gap-3">
                

                  <button
                    onClick={() =>
                      handleDelete(
                        component.id
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