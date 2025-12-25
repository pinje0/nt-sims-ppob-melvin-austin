import { api } from "./api";

export const authAPI = {
  // POST /registration
  register: async (data) => {
    return await api.post("/registration", {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      password: data.password,
    });
  },

  // POST /login
  login: async (data) => {
    return await api.post("/login", {
      email: data.email,
      password: data.password,
    });
  },
};
