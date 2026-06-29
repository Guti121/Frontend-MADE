import { useState } from "react";
import { createAdjust } from "../../services/stock.service";
import UnitBrandSelect from "../brand/UnitBrandSelect";
import toast from "react-hot-toast";

export default function StockAdjustForm({ stock, location, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    quantity_base: "",
    reason: "",
    unit: stock.unit || "", // <-- add unit with default from stock
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isDisabled = loading || !form.quantity_base || !form.reason || !form.unit;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.quantity_base || !form.reason || !form.unit) {
      toast.error("Por favor complete todos los campos.");
      return;
    }

    if (Number(form.quantity_base) < 0 ) {
      toast.error("La cantidad debe de ser positiva ");
      return;
    }

    try {
      setLoading(true);

      const body = {
        location_id:   Number(location),
        stock_id:      Number(stock.id),
        quantity_base: Number(form.quantity_base),
        component_id:  stock.component_id,
        unit:          form.unit,   // <-- from form, not stock
        reason:        form.reason,
      };
      console.log(body)

      await createAdjust(body);

      setForm({ quantity_base: "", reason: "", unit: stock.unit || "" });
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error registrando ajuste");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-xl p-6 mt-4 space-y-4">

      <h2 className="text-xl font-semibold text-black-600">Registrar Ajuste</h2>

      <div className="grid grid-cols-2 gap-4">

        {/* LEFT - Quantity + Unit */}
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

          <div>
            <label className="block text-sm font-medium mb-1">Unidad</label>
            <UnitBrandSelect
              value={form.unit}
              onChange={(e) => setForm({ ...form, unit: e.target.value })}
            />
          </div>
        </div>

        {/* RIGHT - Reason */}
        <div>
          <label className="block text-sm font-medium mb-1">Razón del ajuste</label>
          <input
            type="text"
            name="reason"
            value={form.reason}
            onChange={handleChange}
            placeholder="Ej: Se rompió el envase"
            className="border rounded-lg px-3 py-2 w-full"
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