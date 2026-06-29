import { useNavigate } from "react-router-dom";
import { deleteContainer } from "../../services/container.service";

export default function ContainersTable({
  containers,
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
      
      await deleteContainer(id);
      
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
              Tipo de containere
            </th>

            <th className="p-4 text-left">
              Acciones 
            </th>
          </tr>
        </thead>

        <tbody>
          {containers.map((container) => (
            <tr
              key={container.id}
              className="border-t cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={()=>navigate(`/containers/${container.id}`)}
            >
              <td className="p-4">
                {container.name}
              </td>

              <td className="p-4">
                {container.type_container_name}
              </td>

              <td className="p-4">
                <div className="flex gap-3">
                

                  <button
                    onClick={() =>
                      handleDelete(
                        container.id
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