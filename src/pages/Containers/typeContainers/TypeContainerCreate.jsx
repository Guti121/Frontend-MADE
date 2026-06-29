// pages/containers/containerCreate.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../../layouts/DashboardLayout";


import TypeContainerForm from "../../../components/containers/TypeContainer/TypeContainerForm";
import { createTypeContainer } from "../../../services/typeContainer.service";

export default function TypeContainerCreate() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    type_container: "",
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
      await createTypeContainer(values);

      navigate("/type-container");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Create envase
      </h1>

      <TypeContainerForm
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </DashboardLayout>
  );
}