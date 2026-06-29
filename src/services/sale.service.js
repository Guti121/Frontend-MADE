import api from "./api";

export const createSale = async (body) => {
  console.log(body);
  const { data } = await api.post("/sale/create-sale", body);
  console.log(data);

  return data.result;
};
