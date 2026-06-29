// components/formulas/FormulaForm.jsx
import { useEffect, useState } from "react";
import ComponentList from "../stock/createStock/stepsCreateStock/step1/Step1";
import {  usePersistedState } from "../../hooks/usePersistedState";


export default function FormulaForm({ values, onChange, onSubmit }) {
  const [showPicker, setShowPicker] = useState(false);
  const [brand] = usePersistedState("brand", "");
  // FormulaForm.jsx — remove the quantity field and compute it
  const totalQuantity = values.components.reduce((sum, c) => sum + Number(c.quantity), 0);

  const unit = brand?.weight ? "g" : "ml";
    // sync unit into parent state once on mount
 
  const handleSelectComponent = (component) => {
    // avoid duplicates
    const already = values.components.find(c => c.id === component.id);
    if (already) return;

    onChange({
      target: {
        name: "components",
        value: [...values.components, { ...component, quantity: 1 ,unit}],
      },
    });
  };

  const handleRemove = (id) => {
    onChange({
      target: {
        name: "components",
        value: values.components.filter(c => c.id !== id),
      },
    });
  };

  const handleQuantity = (id, qty) => {
    onChange({
      target: {
        name: "components",
        value: values.components.map(c =>
          c.id === id ? { ...c, quantity: qty } : c
        ),
      },
    });
  };

 
  return (
    <form onSubmit={onSubmit} className="space-y-6">

      {/* Name */}
      <div>
        <label className="block text-sm font-semibold mb-1">Name</label>
        <input
          type="text" name="name" value={values.name} onChange={onChange}
          className="w-full border rounded-xl px-3 py-2.5 outline-none focus:border-indigo-400"
        />
      </div>

      {/* Quantity */}
       {values.components.length > 0 && (
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-600">Cantidad total</span>
            <span className="text-sm font-bold text-indigo-600">{totalQuantity} {unit}</span>
          </div>
        )}

      {/* Components */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold">Components</label>
          <button
            type="button"
            onClick={() => setShowPicker(p => !p)}
            className="text-xs bg-indigo-100 text-indigo-600 font-bold px-3 py-1.5 rounded-lg hover:bg-indigo-200 transition-colors"
          >
            {showPicker ? "✕ Cerrar" : "+ Add Component"}
          </button>
        </div>

        {/* Component picker */}
        {showPicker && (
          <div className="border rounded-xl overflow-hidden mb-3">
            <ComponentList
              onSelect={(component) => {
                handleSelectComponent(component);
                setShowPicker(false);
              }}
            />
          </div>
        )}

        {/* Selected components list */}
        {values.components.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4 border rounded-xl">
            No components added yet
          </p>
        ) : (
          <div className="space-y-2">
            {values.components.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between gap-3 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3"
              >
                <span className="text-sm font-medium text-gray-700 flex-1">
                  {c.name}
                </span>

                {/* Quantity with label above */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-400 font-semibold">Cantidad</label>
                  <input
                    type="number" min="1" value={c.quantity}
                    onChange={e => handleQuantity(c.id, Number(e.target.value))}
                    className="w-20 border rounded-lg px-2 py-1.5 text-sm text-center outline-none focus:border-indigo-400"
                  />
                  <label className="text-xs text-gray-400 font-semibold">{unit}</label>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemove(c.id)}
                  className="text-red-400 hover:text-red-600 text-xs font-bold transition-colors self-start"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-4 py-2.5 rounded-xl transition-colors"
      >
        Save Formula
      </button>
    </form>
  );
}