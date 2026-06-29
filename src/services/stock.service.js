import api from "./api";
// Component.service.js

export const getStock = async ({ id = "", page = 1, limit = 10 }) => {
  const { data } = await api.get("/stock/list", {
    params: {
      id,
      page,
      limit,
    },
  });
  console.log(data);

  return data.result;
};

export const createStock = async (body) => {
  console.log(body, "body");
  const { data } = await api.post("/stock/create", body);
  return data;
};

export const getStockById = async (id, location) => {
  const { data } = await api.get(`/stock/retrieve`, {
    params: {
      id_stock: id,
      id: location,
    },
  });
  return data.result;
};

export const deleteStock = async (id) => {
  const { data } = await api.get(`/component/delete/${id}`);
  return data.result;
};

export const createLoss = async (body) => {
  const { data } = await api.post("/stock/register-loss", body);
  console.log(data);

  return data.result;
};

export const createAdjust = async (body) => {
  const { data } = await api.post("/stock/register-adjustment", body);
  console.log(data);

  return data.result;
};

export const updateStock = async (body) => {
  const { data } = await api.post("/stock/update", body);
  console.log(data);

  return data.result;
};
