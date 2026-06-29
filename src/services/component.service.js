import api from "./api";
// Component.service.js

export const getComponents = async ({
  name = "",
  type_component = "",
  page = 1,
  limit = 10,
}) => {
  console.log(type_component, "asdas");
  const { data } = await api.get("/component/list", {
    params: {
      name,
      type_component,
      page,
      limit,
    },
  });

  return data.result;
};

export const createComponent = async (body) => {
  console.log(body, "body");
  const { data } = await api.post("/component/create", body);
  return data;
};

export const getComponentById = async (id) => {
  const { data } = await api.get(`/Component/retrieve-components`, {
    params: {
      id,
    },
  });
  return data.result;
};

export const deleteComponent = async (id) => {
  const { data } = await api.get(`/component/delete/${id}`);
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
