import api from "./api";

export const createTypeContainer = async (body) => {
  console.log(body, "body");
  const { data } = await api.post("/container/create-type", body);
  return data;
};

export const deleteTypeContainer = async (idType) => {
  const { data } = await api.delete(`/container/delete-type`, {
    params: { idType },
  });
  return data.result;
};

export const getTypeContainers = async ({
  name = "",
  page = 1,
  limit = 10,
}) => {
  const { data } = await api.get("/container/list-type", {
    params: {
      name,
      page,
      limit,
    },
  });

  return data.result;
};
