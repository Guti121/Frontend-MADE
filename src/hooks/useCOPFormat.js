import { useState } from "react";

export const formatCOP = (value) => {
  if (!value) return "";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(value);
};

export function useCOPFormat(fields) {
  const [display, setDisplay] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field]: "" }), {}),
  );

  const handlePriceChange = (e, setForm) => {
    const { name, value } = e.target;
    const raw = value.replace(/\D/g, "");

    setForm((prev) => ({ ...prev, [name]: raw }));
    setDisplay((prev) => ({ ...prev, [name]: formatCOP(raw) }));
  };

  const resetDisplay = () => {
    setDisplay(fields.reduce((acc, field) => ({ ...acc, [field]: "" }), {}));
  };

  return { display, handlePriceChange, resetDisplay };
}
