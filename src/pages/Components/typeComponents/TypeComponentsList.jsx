import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../../layouts/DashboardLayout";
import Pagination from "../../../components/ui/Pagination";
import Button from "../../../components/ui/Button";
import TypeComponentsTable from "../../../components/component/TypeComponents/TypeComponentsTable";
import { getTypeComponents } from "../../../services/typeComponent.service";

export default function TypeComponentsList() {
  const navigate = useNavigate();

  const [typeComponents, setTypeComponents] =
    useState([]);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [name, setName] = useState("");

  useEffect(() => {
    loadTypeComponents();
  }, [page, name]);

  const loadTypeComponents = async () => {
    try {
      const result = await getTypeComponents({
        page,
        limit: 10,
        name,
      });
      console.log(result)

      setTypeComponents(result.data);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Tipo de envases 
        </h1>

        <Button
          onClick={() =>
            navigate("/type-component/create")
          }
        >
          Create tipo
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Filtro por nombre */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tipo de envase
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => {
                setPage(1);
                setName(e.target.value);
              }}
              placeholder="Buscar tipo..."
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>


        </div>
      </div>

      <TypeComponentsTable
        typeComponents={typeComponents}
        onDelete={loadTypeComponents}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </DashboardLayout>
  );
}