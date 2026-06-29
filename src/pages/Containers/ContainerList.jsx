import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import ContainersTable from "../../components/containers/ContainerTable";
import Pagination from "../../components/ui/Pagination";
import Button from "../../components/ui/Button";
import TypeContainerSelect from "../../components/containers/TypeContainerSelect";

import {
  getContainers,
} from "../../services/container.service";

export default function ContainerList() {
  const navigate = useNavigate();

  const [containers, setContainers] =
    useState([]);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [name, setName] = useState("");

  const [
    typeContainer,
    setTypeContainer,
  ] = useState("");

  useEffect(() => {
    loadContainers();
  }, [page, name, typeContainer]);

  const loadContainers = async () => {
    try {
      console.log(name,"name")
      const result = await getContainers({
        page,
        limit: 10,
        name,
        type_container: typeContainer,
      });

      setContainers(result.data);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          containers
        </h1>

        <Button
          onClick={() =>
            navigate("/container/create")
          }
        >
          Create container
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Filtro por nombre */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Nombre del containere
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => {
                setPage(1);
                setName(e.target.value);
              }}
              placeholder="Buscar containere..."
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Filtro dinámico por tipo */}
          <TypeContainerSelect
            value={typeContainer}
            onChange={(e) => {
              setPage(1);
              setTypeContainer(
                e.target.value
              );
            }}
          />

        </div>
      </div>

      <ContainersTable
        containers={containers}
        onDelete={loadContainers}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </DashboardLayout>
  );
}