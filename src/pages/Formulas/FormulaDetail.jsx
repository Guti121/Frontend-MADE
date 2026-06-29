import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getFormulaById } from "../../services/formula.service";

export default function FormulaDetail() {
  const { id } = useParams();

  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComponents();
  }, [id]);

  const loadComponents = async () => {
    try {
      const result = await getFormulaById(id);

      console.log("Formula detail:", result);

      setComponents(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formula = components[0];

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Formula Detail
        </h1>
      </div>

      {/* Formula Information */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Formula Information
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">
              Formula Name
            </p>

            <p className="font-medium">
              {formula?.formula_name}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Final Quantity
            </p>

            <p className="font-medium">
              {formula?.final_quantity} {formula?.unit}
            </p>
          </div>
        </div>
      </div>

      {/* Components Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-4 text-left">
                Component
              </th>

              <th className="p-4 text-left">
                Quantity
              </th>

              <th className="p-4 text-left">
                Unit
              </th>
            </tr>
          </thead>

          <tbody>
            {components.length > 0 ? (
              components.map((component) => (
                <tr
                  key={component.id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="p-4">
                    {component.component_name}
                  </td>

                  <td className="p-4">
                    {component.quantity}
                  </td>

                  <td className="p-4">
                    {component.unit}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="p-4 text-center text-gray-500"
                >
                  No components found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}