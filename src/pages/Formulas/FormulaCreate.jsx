// pages/Formulas/FormulaCreate.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import FormulaForm from "../../components/formulas/FormulaForm";

import { createFormula } from "../../services/formula.service";

export default function FormulaCreate() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
  name: "",

  container_id: "",
  components:   [],
});

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const totalQuantity = values.components.reduce((sum, c) => sum + Number(c.quantity), 0);

  try {
    await createFormula({
      name:         values.name,
      quantity:     Number(totalQuantity),      // ← root level quantity
      container_id: values.container_id || undefined,  // ← optional
      components:   values.components.map(c => ({
        component_id: c.id,
        quantity:     c.quantity,
        unit:         c.unit,
      })),
    });
    navigate("/formulas");
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Error al guardar la fórmula");
  }
};

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Create Formula
      </h1>

      <FormulaForm
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </DashboardLayout>
  );
}