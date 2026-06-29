import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getStockById } from "../../services/stock.service";
import { usePersistedState } from "../../hooks/usePersistedState";
import DashboardLayout from "../../layouts/DashboardLayout";
import StockLossForm from "../../components/stock/stockLossForm";
import StockAdjustForm from "../../components/stock/stockAdjustForm";
import StockPurshaseForm from "../../components/stock/stockPurchaseForm";

const TRANSACTION_TYPES = [
  { key: "PURCHASE",      label: "Realizar Ingreso",      color: "bg-blue-600 hover:bg-blue-700" },
  { key: "ADJUSTMENT_P",  label: "Ajustar Cantidad ",   color: "bg-yellow-500 hover:bg-yellow-600" },
  { key: "LOSS",          label: "Reportar Perdida",           color: "bg-red-600 hover:bg-red-700" },
];

export default function StockDetail() {
  const { id } = useParams();

  const [location] = usePersistedState("selectedLocation", "");
  const [stock, setStock] = useState(null);
  const [selectedType, setSelectedType] = useState(null); // <-- tracks which button was clicked
 
  useEffect(() => {
    loadStock();
  }, [id]);

  const loadStock = async () => {
    try {
      const result = await getStockById(id, location);
      setStock(result);
    } catch (error) {
      console.error(error);
    }
  };

  
  if (!stock) return <p className="p-6">Loading...</p>;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">Detalle Stock</h1>

        <div className="bg-white shadow rounded-xl p-6 space-y-4">

          <div>
            <h2 className="text-2xl font-semibold">{stock.component_name}</h2>
            <p className="text-gray-500">{stock.type_component_name}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div><p className="font-semibold">ID</p><p>{stock.id}</p></div>
            <div><p className="font-semibold">Sede</p><p>{stock.location_name}</p></div>
            <div><p className="font-semibold">Cantidad Disponible</p><p>{stock.quantity_base}</p></div>
            <div><p className="font-semibold">Precio costo</p><p>${stock.avg_price}/Unit</p></div>
            <div><p className="font-semibold">Precio al por mayor</p><p>${stock.wholesale_price}/Unit</p></div>
            <div><p className="font-semibold">Precio Consumidor</p><p>${stock.consumer_price}/Unit</p></div>
            <div><p className="font-semibold">Creado por</p><p>{stock.created_by}</p></div>
            <div><p className="font-semibold">Actulizado por</p><p>{stock.updated_by}</p></div>
            <div>
              <p className="font-semibold">Ultima Actulizacion</p>
              <p>{new Date(stock.updated_at).toLocaleString()}</p>
            </div>
            <div>
              <p className="font-semibold">Estado</p>
              <p>{stock.state ? "Active" : "Inactive"}</p>
            </div>
          </div>

        </div>

        {/* TRANSACTION BUTTONS */}
        <div className="bg-white shadow rounded-xl p-6 mt-6 space-y-4">
          <h2 className="text-xl font-semibold">Registrar Movimiento</h2>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            {TRANSACTION_TYPES.map((t) => (
              <button
                key={t.key}
                onClick={() => setSelectedType(t.key)}
                className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${t.color} ${
                  selectedType === t.key ? "ring-2 ring-offset-2 ring-black" : ""  // <-- highlight selected
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Quantity input — only shows when a type is selected */}
          {selectedType && (
  <div className="flex flex-col gap-4 mt-4">

    {/* LOSS FORM */}
    {selectedType === "LOSS" && (
       <StockLossForm
      stock={stock}
      location={location}
      onSuccess={() => {
        setSelectedType(null)
        loadStock();
      }}
      onCancel={() => setSelectedType(null)}
  />
    ) }
  {selectedType === "ADJUSTMENT_P" &&(
      /* OTHER TRANSACTIONS */
      <StockAdjustForm
      stock={stock}
      location={location}
      onSuccess={() => {
        setSelectedType(null)
        loadStock();
      }}
      onCancel={() => setSelectedType(null)}
  />
    )}
  {selectedType === "PURCHASE" &&(
      /* OTHER TRANSACTIONS */
      <StockPurshaseForm
      stock={stock}
      location={location}
      wholesale_price={stock.wholesale_price}
      consumer_price={stock.consumer_price}
      onSuccess={() => {
        setSelectedType(null)
        loadStock();
      }}
      onCancel={() => setSelectedType(null)}
  />
    )}
  </div>
)}
        </div>

      </div>
    </DashboardLayout>
  );
}