import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import ComponentTable from "../../components/component/ComponentTable";
import Pagination from "../../components/ui/Pagination";
import Button from "../../components/ui/Button";
import TypeComponentSelect from "../../components/component/TypeComponentSelect";

import {
  getComponents,
} from "../../services/Component.service";

export default function ComponentList() {
  const navigate = useNavigate();

  const [components, setComponents] =
    useState([]);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [name, setName] = useState("");

  const [
    typeComponent,
    setTypeComponent,
  ] = useState("");

  useEffect(() => {
    loadComponents();
  }, [page, name, typeComponent]);

  const loadComponents = async () => {
    try {
      console.log(name,"name")
      const result = await getComponents({
        page,
        limit: 10,
        name,
        type_component: typeComponent,
      });

      setComponents(result.data);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Components
        </h1>

        <Button
          onClick={() =>
            navigate("/component/create")
          }
        >
          Create Component
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Filtro por nombre */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Nombre del componente
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => {
                setPage(1);
                setName(e.target.value);
              }}
              placeholder="Buscar componente..."
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Filtro dinámico por tipo */}
          <TypeComponentSelect
            value={typeComponent}
            onChange={(e) => {
              setPage(1);
              setTypeComponent(
                e.target.value
              );
            }}
          />

        </div>
      </div>

      <ComponentTable
        Components={components}
        onDelete={loadComponents}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </DashboardLayout>
  );
}