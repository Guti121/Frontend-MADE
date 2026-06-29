import { useEffect, useState } from "react";
import LocationSelect from "../../components/location/locationSelect";
import StockTable from "../../components/stock/stockTable";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getStock } from "../../services/stock.service";
import Pagination from "../../components/ui/Pagination";
import { usePersistedState } from "../../hooks/usePersistedState";
import Button from "../../../src/components/ui/Button"
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [page, setPage] = useState(1);
    const[stock,setStock] = useState([])
     const [totalPages, setTotalPages] = useState();
     const navigate = useNavigate()
    
    const [locations, setLocations] = usePersistedState("selectedLocation", "")
    
  useEffect(() => {
    if (!locations) return;
      loadStock();
    }, [page, locations]);

   const loadStock = async () => {
      try {
        const result = await getStock({
          id:locations,
          page,
          limit: 10
        });
  
        setStock(result.data);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error(error);
      }
    };
 return (
  <DashboardLayout>

    {/* HEADER */}
    <div className="flex justify-between items-center mb-6">

      <div>

        <h1 className="text-3xl font-bold">
          Almacen
        </h1>

        <p className="text-gray-500">
          Productos disponibles
        </p>

      </div>

      <Button
        onClick={() =>
          navigate("/stocks/create")
        }
      >
        Ingresar Nuevo producto
      </Button>

    </div>

    {/* CARDS */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

      <div className="bg-white p-6 rounded-xl shadow">

        <h3 className="text-gray-500">
          Products
        </h3>

        <p className="text-3xl font-bold">
          120
        </p>

      </div>

      <div className="bg-white p-6 rounded-xl shadow">

        <h3 className="text-gray-500">
          Sales
        </h3>

        <p className="text-3xl font-bold">
          35
        </p>

      </div>

      <div className="bg-white p-6 rounded-xl shadow">

        <h3 className="text-gray-500">
          Users
        </h3>

        <p className="text-3xl font-bold">
          8
        </p>

      </div>

    </div>

    {/* FILTERS */}
    <div className="bg-white rounded-xl shadow p-4 mb-6">

      <LocationSelect
        value={locations}
        onChange={(e) => {

          setPage(1);

          setLocations(
            e.target.value
          );

        }}
      />

    </div>

    {/* TABLE */}
    <StockTable
      stock={stock}
      onDelete={loadStock}
    />

    {/* PAGINATION */}
    <div className="mt-6">

      <Pagination
        page={page}
        totalPages={totalPages || 1}
        onPageChange={setPage}
      />

    </div>

  </DashboardLayout>
);
}