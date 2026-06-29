import { useEffect, useState } from "react";
import { createAdjust, updateStock } from "../../services/stock.service";
import UnitBrandSelect from "../brand/UnitBrandSelect";
import toast from "react-hot-toast";
import { useCOPFormat } from "../../hooks/useCOPFormat";
import COPInput from "../ui/COPInput";
import { toBaseUnit } from "../../utils/stock.utils";
import { useStockPriceCalc } from "../../hooks/useStockPriceCalc";

export default function StockPurshaseForm({ stock, location, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    quantity_base: "",
    reason: "",
    unit: stock.unit || "",
    total_purchase_price: "",
    wholesale_price: "",
    consumer_price: "",
  });

  const [unitValue,setUnitValue] = useState({})

  const [loading, setLoading] = useState(false);

  // <-- add this
  const { display, handlePriceChange, resetDisplay } = useCOPFormat([
    "total_purchase_price",
    "wholesale_price",
    "consumer_price",
  ]);

  // for a calculation 
    const calculated = useStockPriceCalc({
    quantity_base:        form.quantity_base,
    unit:                 form.unit,
    total_purchase_price: form.total_purchase_price,
    consumer_price:       form.consumer_price,
    wholesale_price:      form.wholesale_price,
  });

  //HandleChange with people write 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isDisabled = loading || !form.quantity_base || !form.unit;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.quantity_base || !form.total_purchase_price || !form.unit || !form.wholesale_price || !form.consumer_price) {
      toast.error("Por favor complete todos los campos.");
      return;
    }

    if (Number(form.quantity_base) < 0) {
      toast.error("La cantidad debe de ser positiva");
      return;
    }

    try {
      setLoading(true);

      const body = {
        location_id:          Number(location),
        stock_id:             Number(stock.id),
        quantity_base:        Number(form.quantity_base),
        component_id:         stock.component_id,
        unit:                 form.unit,
        total_purchase_price: Number(form.total_purchase_price),
        wholesale_price:      Number(form.wholesale_price),
        consumer_price:       Number(form.consumer_price),
      };

      console.log(body);
      await updateStock(body);

      // reset both form and display
      setForm({ quantity_base: "", total_purchase_price: "", wholesale_price: "", consumer_price: "", unit: stock.unit || "" });
      resetDisplay(); // <-- reset formatted display
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error registrando el ingreso");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-xl p-6 mt-4 space-y-4">

      <h2 className="text-xl font-semibold">Registrar Ajuste</h2>

      <div className="grid grid-cols-2 gap-4">

        {/* LEFT - Quantity + Prices */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Cantidad</label>
            <input
              type="number"
              name="quantity_base"
              min="1"
              value={form.quantity_base}
              onChange={handleChange}
              placeholder="Ej: 390"
              className="border rounded-lg px-3 py-2 w-full"
            />
          </div>

          {/* <-- replaced with COPInput */}
          <COPInput
            label="Valor de costo total"
            name="total_purchase_price"
            value={display.total_purchase_price}
            onChange={(e) => handlePriceChange(e, setForm)}
          />
          {/* Avg price */}
            <div className="bg-gray-50 rounded-lg px-3 py-2">
            <p className="text-sm text-gray-500">Precio costo por unidad (calculado)</p>
            <p className="font-semibold text-green-600">{calculated.avg_price_formatted}</p>
            </div>

            <COPInput
            label="Precio Consumidor (total)"
            name="consumer_price"
            value={display.consumer_price}
            onChange={(e) => handlePriceChange(e, setForm)}
            />

            {/* Consumer per unit */}
            <div className="bg-gray-50 rounded-lg px-3 py-2">
            <p className="text-sm text-gray-500">Precio consumidor por unidad (calculado)</p>
            <p className="font-semibold text-blue-600">{calculated.consumer_formatted}</p>
            </div>

            <COPInput
            label="Precio mayorista (total)"
            name="wholesale_price"
            value={display.wholesale_price}
            onChange={(e) => handlePriceChange(e, setForm)}
            />

            {/* Wholesale per unit */}
            <div className="bg-gray-50 rounded-lg px-3 py-2">
            <p className="text-sm text-gray-500">Precio mayorista por unidad (calculado)</p>
            <p className="font-semibold text-purple-600">{calculated.wholesale_formatted}</p>
            </div>
        </div>

        {/* RIGHT - Unit */}
        <div>
          <UnitBrandSelect
            value={form.unit}
            onChange={(e) => setForm({ ...form, unit: e.target.value })}
          />
        </div>

      </div>

      {/* Stock Info - readonly */}
      <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4 text-sm">
        <div>
          <p className="font-medium text-gray-500">Componente</p>
          <p>{stock.component_name}</p>
        </div>
        <div>
          <p className="font-medium text-gray-500">Unidad actual</p>
          <p>{stock.unit}</p>
        </div>
        <div>
          <p className="font-medium text-gray-500">Stock disponible</p>
          <p>{stock.quantity_base}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isDisabled}
          className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50"
        >
          {loading ? "Registrando..." : "Confirmar Ajuste"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
        >
          Cancelar
        </button>
      </div>

    </form>
  );
}