import { useState } from "react";
import { usePersistedState } from "../../hooks/usePersistedState";
import DashboardLayout from "../../layouts/DashboardLayout";
import Button from "../ui/Button";
import FormulaSearchSelect from "./FormulaSaleSelect";
import ComponentSearchSelect from "./ComponentSearchSelect";
import ContainerSearchSelect from "./ContainerSearchSelect";
import { createSale } from "../../services/sale.service";
import { getFormulaById } from "../../services/formula.service";
import toast from "react-hot-toast";
import { FormulaItemSummary, SaleBillSummary } from "./SaleSummary";

const emptyItem = () => ({
  formula_id:          "",
  formula_name:        "",
  quantity:            1,
  discount:            0,
  tax:                 0,
  sales_components:    [],
  showFormulaSearch:   true,
  showComponentSearch: false,
  sales_container: {
    container_id:   "",
    container_name: "",
    quantity_used:  1,
    unit_price:     0,
    consumer_price:      0,
    wholesale_price:0,
  },
});

const emptyComponent = () => ({
  component_id:        "",
  component_name:      "",
  quantity_used:       1,
  unit_price:          0,
  consumer_price:      0,
  wholesale_price:0,
  showComponentSearch: true,
});

export default function SaleCreateForm() {
  const [location] = usePersistedState("selectedLocation", "");
  const [loading, setLoading] = useState(false);

  const [sale, setSale] = useState({
    client_id:    "",
    is_wholesale: false,
    sales_items:  [],
  });

  // ── ITEM HELPERS ──────────────────────────────────────────
  const addItem = () => {
    setSale((prev) => ({
      ...prev,
      sales_items: [...prev.sales_items, emptyItem()],
    }));
  };

  const removeItem = (index) => {
    setSale((prev) => ({
      ...prev,
      sales_items: prev.sales_items.filter((_, i) => i !== index),
    }));
  };

  const updateItem = (index, field, value) => {
    setSale((prev) => {
      const items = [...prev.sales_items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, sales_items: items };
    });
  };

  const onSelectFormula = async (index, formula) => {
    try {
      const components = await getFormulaById(formula.id);

      setSale((prev) => {
        const items = [...prev.sales_items];
        items[index] = {
          ...items[index],
          formula_id:        formula.id,
          formula_name:      formula.name,
          showFormulaSearch: false,
          sales_components:  components.map((c) => (console.log(c),{
            component_id:        c.id,
            component_name:      c.component_name,
            quantity_used:       Number(c.quantity),
            unit_price:          Number(c.unit_price) || 0,   // <-- sent to API
            consumer_price:      Number(c.consumer_price) || 0, // <-- display only
            wholesale_price:      Number(c.wholesale_price) || 0, // <-- display only
            showComponentSearch: false,
          })),
        };
        return { ...prev, sales_items: items };
      });
    } catch (error) {
      console.error(error);
      toast.error("Error cargando componentes de la formula");
    }
  };

  // ── CONTAINER HELPERS ─────────────────────────────────────
  const onSelectContainer = (index, container) => {
    setSale((prev) => {
      const items = [...prev.sales_items];
      items[index] = {
        ...items[index],
        sales_container: {
          ...items[index].sales_container,
          container_id:   container.container_id,
          container_name: container.container_name,
          consumer_price:      Number(container.consumer_price) || 0, // <-- display only
          wholesale_price:      Number(container.wholesale_price) || 0, // <-- display only
        },
      };
      return { ...prev, sales_items: items };
    });
  };

  const updateContainer = (index, field, value) => {
    setSale((prev) => {
      const items = [...prev.sales_items];
      items[index] = {
        ...items[index],
        sales_container: { ...items[index].sales_container, [field]: value },
      };
      return { ...prev, sales_items: items };
    });
  };

  // ── COMPONENT HELPERS ─────────────────────────────────────
  const addComponent = (itemIndex) => {
    setSale((prev) => {
      const items = [...prev.sales_items];
      items[itemIndex] = {
        ...items[itemIndex],
        sales_components: [...items[itemIndex].sales_components, emptyComponent()],
      };
      return { ...prev, sales_items: items };
    });
  };

  const removeComponent = (itemIndex, compIndex) => {
    setSale((prev) => {
      const items = [...prev.sales_items];
      items[itemIndex] = {
        ...items[itemIndex],
        sales_components: items[itemIndex].sales_components.filter((_, i) => i !== compIndex),
      };
      return { ...prev, sales_items: items };
    });
  };

  const onSelectComponent = (itemIndex, compIndex, component) => {
    setSale((prev) => {
      const items = [...prev.sales_items];
      items[itemIndex].sales_components[compIndex] = {
        ...items[itemIndex].sales_components[compIndex],
        component_id:        component.component_id || component.id,
        component_name:      component.name || component.component_name,
        consumer_price:      Number(component.consumer_price) || 0,
        wholesale_price:      Number(component.wholesale_price) || 0,
        unit_price:          Number(component.unit_price) || 0,
        showComponentSearch: false,
      };
      return { ...prev, sales_items: items };
    });
  };

  const updateComponent = (itemIndex, compIndex, field, value) => {
    setSale((prev) => {
      const items = [...prev.sales_items];
      items[itemIndex].sales_components[compIndex] = {
        ...items[itemIndex].sales_components[compIndex],
        [field]: value,
      };
      return { ...prev, sales_items: items };
    });
  };

  // ── SUBMIT ────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!sale.client_id) { toast.error("Cliente requerido"); return; }
    if (sale.sales_items.length === 0) { toast.error("Agrega al menos una formula"); return; }

    const payload = {
      location_id:           Number(location),
      client_id:             Number(sale.client_id),
      is_wholesale:          sale.is_wholesale,
      formula_name_snapshot: sale.sales_items[0]?.formula_name || "",
      sales_items: sale.sales_items.map((item) => ({
        formula_id:       Number(item.formula_id),
        quantity:         Number(item.quantity),
        discount:         Number(item.discount),
        tax:              Number(item.tax),
        sales_components: item.sales_components.map((c) => ({
          component_id:  Number(c.component_id),
          quantity_used: Number(c.quantity_used),
          unit_price:    Number(c.unit_price), // <-- correct field
        })),
        sales_container: {
          container_id:  Number(item.sales_container.container_id),
          quantity_used: Number(item.sales_container.quantity_used),
          unit_price:    Number(item.sales_container.unit_price),
        },
      })),
    };

    try {
      setLoading(true);
      await createSale(payload);
      toast.success("Venta creada exitosamente");
      setSale({ client_id: "", is_wholesale: false, sales_items: [] });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error creando la venta");
    } finally {
      setLoading(false);
    }
  };

  // ── RENDER ────────────────────────────────────────────────
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-6 space-y-6">

        <h1 className="text-3xl font-bold">Crear Venta</h1>

        {/* HEADER */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="font-semibold text-lg">Información General</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">ID Cliente</label>
              <input
                type="number"
                placeholder="Ej: 12"
                value={sale.client_id}
                onChange={(e) => setSale({ ...sale, client_id: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex items-center gap-2 mt-5">
              <input
                type="checkbox"
                id="wholesale"
                checked={sale.is_wholesale}
                onChange={(e) => setSale({ ...sale, is_wholesale: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="wholesale" className="text-sm font-medium">
                Precio mayorista
              </label>
            </div>
          </div>
        </div>

        {/* ITEMS */}
        {sale.sales_items.map((item, itemIndex) => (
          <div key={itemIndex} className="bg-white p-6 rounded-xl shadow space-y-6">

            {/* FORMULA HEADER */}
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg">Formula #{itemIndex + 1}</h2>
              <button
                type="button"
                onClick={() => removeItem(itemIndex)}
                className="text-red-500 text-sm hover:text-red-700"
              >
                Eliminar
              </button>
            </div>

            {/* FORMULA SEARCH OR SELECTED */}
            {item.formula_id ? (
              <div className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3">
                <div>
                  <p className="font-medium">{item.formula_name}</p>
                  <p className="text-xs text-gray-400">ID: {item.formula_id}</p>
                </div>
                <button
                  type="button"
                  onClick={() => updateItem(itemIndex, "formula_id", "")}
                  className="text-blue-500 text-sm"
                >
                  Cambiar
                </button>
              </div>
            ) : (
              <FormulaSearchSelect onSelect={(f) => onSelectFormula(itemIndex, f)} />
            )}

            {/* FORMULA FIELDS */}
            {item.formula_id && (
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Cantidad</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(itemIndex, "quantity", e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Descuento</label>
                  <input
                    type="number"
                    min="0"
                    value={item.discount}
                    onChange={(e) => updateItem(itemIndex, "discount", e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Impuesto</label>
                  <input
                    type="number"
                    min="0"
                    value={item.tax}
                    onChange={(e) => updateItem(itemIndex, "tax", e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>
            )}

            {/* CONTAINER */}
            {item.formula_id && (
              <div className="space-y-3">
                <h3 className="font-medium">Envase</h3>

                {item.sales_container.container_id ? (
                  <div className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3">
                    <div>
                      <p className="font-medium">{item.sales_container.container_name}</p>
                      <p className="text-xs text-gray-400">ID: {item.sales_container.container_id}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => updateContainer(itemIndex, "container_id", "")}
                      className="text-blue-500 text-sm"
                    >
                      Cambiar
                    </button>
                  </div>
                ) : (
                  <ContainerSearchSelect location_id ={location} onSelect={(c) => onSelectContainer(itemIndex, c)} />
                )}

                {item.sales_container.container_id && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Cantidad usada</label>
                      <input
                        type="number"
                        min="1"
                        value={item.sales_container.quantity_used}
                        onChange={(e) => updateContainer(itemIndex, "quantity_used", e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>

                    <p className="text-xs text-gray-500">Precio consumidor/Uni</p>
                            <p className="text-sm font-medium">
                              ${Number(item.sales_container.consumer_price).toLocaleString("es-CO")}
                            </p>
                            <p className="text-xs text-gray-500">Precio mayorista/Uni</p>
                            <p className="text-sm font-medium">
                              ${Number(item.sales_container.wholesale_price).toLocaleString("es-CO")}
                            </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* COMPONENTS */}
            {item.formula_id && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Componentes</h3>
                  <button
                    type="button"
                    onClick={() => addComponent(itemIndex)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    + Agregar componente
                  </button>
                </div>

                {item.sales_components.length === 0 && (
                  <p className="text-sm text-gray-400">No hay componentes agregados</p>
                )}

                <div className="border rounded-lg divide-y">
                  {item.sales_components.map((comp, compIndex) => (
                    <div key={compIndex} className="p-3 space-y-3">

                      {comp.showComponentSearch || !comp.component_id ? (
                        // SEARCH
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-gray-500">Buscar componente</p>
                            <button
                              type="button"
                              onClick={() => removeComponent(itemIndex, compIndex)}
                              className="text-red-500 text-xs"
                            >
                              Cancelar
                            </button>
                          </div>
                          <ComponentSearchSelect
                            location_id={location}
                            onSelect={(c) => onSelectComponent(itemIndex, compIndex, c)}
                          />
                        </div>
                      ) : (
                        // SELECTED
                        <div className="grid grid-cols-4 gap-4 items-center">
                          <div>
                            <p className="text-sm font-medium">{comp.component_name}</p>
                            <p className="text-xs text-gray-400">ID: {comp.component_id}</p>
                          </div>

                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Cantidad</label>
                            <input
                              type="number"
                              min="1"
                              value={comp.quantity_used}
                              onChange={(e) =>
                                updateComponent(itemIndex, compIndex, "quantity_used", e.target.value)
                              }
                              className="w-full border rounded-lg px-2 py-1 text-sm"
                            />
                          </div>


                          <div className="space-y-1">
                            <p className="text-xs text-gray-500">Precio consumidor/Uni</p>
                            <p className="text-sm font-medium">
                              ${Number(comp.consumer_price).toLocaleString("es-CO")}
                            </p>
                            <p className="text-xs text-gray-500">Precio mayorista/Uni</p>
                            <p className="text-sm font-medium">
                              ${Number(comp.wholesale_price).toLocaleString("es-CO")}
                            </p>
                            <div className="flex gap-2 mt-1">
                              <button
                                type="button"
                                onClick={() =>
                                  updateComponent(itemIndex, compIndex, "showComponentSearch", true)
                                }
                                className="text-blue-500 text-xs"
                              >
                                Cambiar
                              </button>
                              <button
                                type="button"
                                onClick={() => removeComponent(itemIndex, compIndex)}
                                className="text-red-500 text-xs"
                              >
                                Eliminar
                              </button>
                            </div>
                          </div>

                        </div>
                      )}

                    </div>
                  ))}
                </div>

              </div>
            )}
          <FormulaItemSummary
            item={item}
            itemIndex={itemIndex}
            is_wholesale={sale.is_wholesale}
          />
          </div>
        ))}

        {/* ACTIONS */}
        <div className="flex gap-3">
          <Button type="button" onClick={addItem}>
            + Agregar Formula
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={loading}>
            {loading ? "Guardando..." : "Guardar Venta"}
          </Button>
        </div>
        <SaleBillSummary
          sales_items={sale.sales_items}
          is_wholesale={sale.is_wholesale}
        />

      </div>
    </DashboardLayout>
  );
}