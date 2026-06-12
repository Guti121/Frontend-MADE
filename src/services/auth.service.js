import api from "./api";

export const login = async (email, password) => {
  const { data } = await api.post("/user/login", {
    email,
    password,
  });

  return data;
};
