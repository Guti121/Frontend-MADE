import api from "./api";

export const createTypeComponent = async (body) => {
  console.log(body, "body");
  const { data } = await api.post("/component/create-type", body);
  return data;
};

export const deleteTypeComponent = async (idType) => {
  const { data } = await api.delete(`/component/delete-type`, {
    params: { idType },
  });
  return data.result;
};

export const getTypeComponents = async ({
  name = "",
  page = 1,
  limit = 10,
}) => {
  const { data } = await api.get("/component/list-type", {
    params: {
      name,
      page,
      limit,
    },
  });

  return data.result;
};
