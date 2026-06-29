// ─── Steps definition ─────────────────────────────────────────────────────────
export const steps = [
  { id: 1, label: "Componente", icon: "🧩" },
  { id: 2, label: "Cantidad",   icon: "📦" },
  { id: 3, label: "Compra",     icon: "🧾" },
  { id: 4, label: "Mayorista",  icon: "🏪" },
  { id: 5, label: "Consumidor", icon: "🛒" },
  { id: 6, label: "Revisión",   icon: "✅" },
];

// ─── Initial state ────────────────────────────────────────────────────────────
export const INIT = {
  component_id: "",
  location_id: "",
  quantity_base: "",
  unit: "",
  total_purchase_price: "",
  wholesale_price: "",
  consumer_price: "",
};

// ─── Validation ───────────────────────────────────────────────────────────────
export function validate(step, data) {
  const err = {};
  if (step === 1) {
  
    if (!data.component_id) err.component_id = "Selecciona un componente";
    if (!data.location_id)  err.location_id  = "Requerido";
  
  }
  if (step === 2) {
    if (!data.quantity_base.trim() || isNaN(Number(data.quantity_base)))
      err.quantity_base = "Ingrese un número válido";
    if (!data.unit.trim()) err.unit = "Requerido";
  }
  if (step === 3) {
    if (!data.total_purchase_price.trim() || isNaN(Number(data.total_purchase_price)))
      err.total_purchase_price = "Ingrese un precio válido";
  }
  if (step === 4) {
    if (!data.wholesale_price.trim() || isNaN(Number(data.wholesale_price)))
      err.wholesale_price = "Ingrese un precio válido";
  }
  if (step === 5) {
    if (!data.consumer_price.trim() || isNaN(Number(data.consumer_price)))
      err.consumer_price = "Ingrese un precio válido";
  }
  return err;
}

// ─── Shared Field ─────────────────────────────────────────────────────────────
export function Field({ label, id, type = "text", value, onChange, error, placeholder, hint }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-semibold text-gray-800">
        {label}
      </label>
      {hint && <span className="text-xs text-gray-400 -mt-0.5">{hint}</span>}
      <input
        id={id} type={type} value={value} placeholder={placeholder}
        onChange={e => onChange(id, e.target.value)}
        className={`px-3.5 py-2.5 rounded-xl text-sm border bg-white text-gray-800 outline-none transition-colors
          focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
          ${error ? "border-red-400" : "border-gray-200"}`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

// ─── Price Field ──────────────────────────────────────────────────────────────
export function PriceField({ label, id, value, onChange, error, hint }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-semibold text-gray-800">{label}</label>
      {hint && <span className="text-xs text-gray-400 -mt-0.5">{hint}</span>}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none">$</span>
        <input
          id={id} type="number" min="0" step="0.01" value={value} placeholder="0.00"
          onChange={e => onChange(id, e.target.value)}
          className={`w-full pl-7 pr-3.5 py-2.5 rounded-xl text-sm border bg-white text-gray-800 outline-none transition-colors
            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100
            [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none
            ${error ? "border-red-400" : "border-gray-200"}`}
        />
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

// ─── Info Box ─────────────────────────────────────────────────────────────────
export function InfoBox({ children, variant = "default" }) {
  const cls = variant === "success"
    ? "bg-green-50 border-green-200"
    : variant === "danger"
    ? "bg-red-50 border-red-200"
    : "bg-indigo-50 border-indigo-100";
  return (
    <div className={`flex gap-2 items-start ${cls} border rounded-xl px-4 py-3 text-sm text-gray-700`}>
      {children}
    </div>
  );
}