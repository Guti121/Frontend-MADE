import { Link } from "react-router-dom";
import { deleteFormula } from "../../services/formula.service";

export default function FormulaTable({
  formulas,
  onDelete,
}) {
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this formula?"
    );

    if (!confirmed) return;

    try {
      await deleteFormula(id);
      
      onDelete();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Error deleting formula"
      );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-100">
            <th className="p-4 text-left">
              Name
            </th>

            <th className="p-4 text-left">
              Quantity
            </th>

            <th className="p-4 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {formulas.map((formula) => (
            <tr
              key={formula.id}
              className="border-t"
            >
              <td className="p-4">
                {formula.name}
              </td>

              <td className="p-4">
                {formula.final_quantity}
              </td>

              <td className="p-4">
                <div className="flex gap-3">
                  <Link
                    to={`/formulas/${formula.id}`}
                    className="text-blue-600"
                  >
                    View
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(
                        formula.id
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