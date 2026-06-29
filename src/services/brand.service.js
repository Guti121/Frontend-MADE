import api from "./api";
// Component.service.js

export const getBrand = async () => {
  const { data } = await api.get("/brand/view-brand");
  console.log(data.brand, "RESUTL");
  return data.brand;
};
