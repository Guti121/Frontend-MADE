import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ComponentTable from "./componentTable";

import { getComponents } from "../../../../../services/Component.service";
import Pagination from "../../../../ui/Pagination";
import TypeComponentSelect from "../../../../component/TypeComponentSelect";


export default function ComponentList({onSelect}) {

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
        limit: 5,
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
    <div>
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
        onClick={(component) => onSelect(component)} 
        onDelete={loadComponents}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}