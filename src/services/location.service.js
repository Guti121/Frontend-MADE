import api from "./api";
// Component.service.js

export const getLocation = async ({ page = 1, limit = 11 }) => {
  const { data } = await api.get("/location/list-location", {
    params: {
      page,
      limit,
    },
  });

  return data.result;
};
