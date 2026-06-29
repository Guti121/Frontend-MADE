import api from "./api";
// formula.service.js

export const getFormulas = async ({
  page = 1,
  limit = 10,
  name = "",
  quantity = "",
}) => {
  const { data } = await api.get("/formula/list", {
    params: {
      page,
      limit,
      name,
      quantity,
    },
  });

  return data.result;
};
export const createFormula = async (body) => {
  console.log(body);
  const { data } = await api.post("/formula/create", body);
  return data;
};

export const getFormulaById = async (id) => {
  const { data } = await api.get(`/formula/retrieve-components`, {
    params: {
      id,
    },
  });
  return data.result;
};

export const deleteFormula = async (id) => {
  const { data } = await api.delete("/formula/delete", {
    params: { id_formula: id },
  });
  return data.result;
};
