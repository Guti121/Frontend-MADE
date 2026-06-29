// pages/components/componentCreate.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../../layouts/DashboardLayout";


import TypeComponentForm from "../../../components/component/TypeComponents/TypeComponentsForm";
import { createTypeComponent } from "../../../services/typeComponent.service";


export default function TypeComponentCreate() {
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
      await createTypeComponent(values);

      navigate("/type-component");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Create envase
      </h1>

      <TypeComponentForm
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </DashboardLayout>
  );
}