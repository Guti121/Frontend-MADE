import api from "./api";

// container.service.js

export const getContainers = async ({
  name = "",
  type_container = "",
  page = 1,
  limit = 10,
}) => {
  console.log(type_container, "asdas");
  const { data } = await api.get("/container/list", {
    params: {
      name,
      type_container,
      page,
      limit,
    },
  });

  return data.result;
};

export const createContainer = async (body) => {
  console.log(body, "body");
  const { data } = await api.post("/container/create", body);
  return data;
};

export const getContainerById = async (id) => {
  const { data } = await api.get(`/container/retrieve-containers`, {
    params: {
      id,
    },
  });
  return data.result;
};

export const deleteContainer = async (id) => {
  const { data } = await api.delete(`/container/delete`, { params: { id } });
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
