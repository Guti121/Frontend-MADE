// pages/Components/ComponentCreate.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import ComponentForm from "../../components/Component/ComponentForm";

import { createComponent } from "../../services/Component.service";

export default function ComponentCreate() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    type_component: "",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createComponent(values);

      navigate("/component");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Create Component
      </h1>

      <ComponentForm
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </DashboardLayout>
  );
}