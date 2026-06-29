import { deleteComponent } from "../../../../../services/Component.service";

deleteComponent
export default function ComponentTable({
  Components,
  onClick,
  onDelete,
}) {

  const handleDelete = async (id) => {
    console.log(id)
    const confirmed = window.confirm(
      "Are you sure you want to delete this Component?"
    );

    if (!confirmed) return;

    try {
      
      await deleteComponent(id);
      
      onDelete();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Error deleting Component"
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
              Tipo de componente
            </th>
          </tr>
        </thead>

        <tbody>
          {Components.map((Component) => (
            <tr
              key={Component.id}
              className="border-t cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={() => onClick(Component)} 
            >
              <td className="p-4">
                {Component.name}
              </td>

              <td className="p-4">
                {Component.type_component_name}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}