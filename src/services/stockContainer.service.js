import api from "./api";
// Component.service.js

export const getStockContainer = async ({ id = "", page = 1, limit = 10 }) => {
  const { data } = await api.get("/stock-container/list", {
    params: {
      id,
      page,
      limit,
    },
  });
  console.log(data);

  return data.result;
};

export const createStockContainer = async (body) => {
  console.log(body, "body");
  const { data } = await api.post("/stock-container/create", body);
  return data;
};

export const getStockContainerById = async (id, location) => {
  const { data } = await api.get(`/stock-container/retrieve`, {
    params: {
      id_stock_container: id,
      id: location,
    },
  });
  return data.result;
};

export const deleteStockContainer = async (id) => {
  const { data } = await api.get(`/component/delete/${id}`);
  return data.result;
};

export const createLossStockContainer = async (body) => {
  const { data } = await api.post("/stock-container/register-loss", body);
  console.log(data);

  return data.result;
};

export const createAdjustStockContainer = async (body) => {
  const { data } = await api.post("/stock-container/register-adjustment", body);
  console.log(data);

  return data.result;
};

export const updateStockContainer = async (body) => {
  const { data } = await api.post("/stock-container/update", body);
  console.log(data);

  return data.result;
};
