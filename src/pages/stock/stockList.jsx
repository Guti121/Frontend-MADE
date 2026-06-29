import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import StockTable from "../../components/stock/stockTable";
import Pagination from "../../stock/ui/Pagination";
import Button from "../../stock/ui/Button";
import TypeStockSelect from "../../stock/component/TypeStockSelect";

import {
  getStock,
} from "../../services/Component.service";

export default function StockList() {
  const navigate = useNavigate();
    const { id } = useParams(); 
  const [stock, setStock] =
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
    loadStock();

  }, [page, name, typeComponent]);

  const loadStock = async () => {
    try {
      console.log(name,"name")
      const result = await getStock({
        page,
        limit: 10,
        name,
        id,
        type_component: typeComponent,
      });
      
      setStock(result.data);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Stock
        </h1>

        <Button
          onClick={() =>
            navigate("/component/create")
          }
        >
          Create Stock
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
          <TypeStockSelect
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

      <StockTable
        stock={stock}
        onDelete={loadStock}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </DashboardLayout>
  );
}