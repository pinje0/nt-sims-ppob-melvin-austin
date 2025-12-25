import { api } from "./api";

export const transactionAPI = {
  // GET /services
  getServices: async () => {
    return await api.get("/services");
  },

  // GET /banner
  getBanners: async () => {
    return await api.get("/banner");
  },

  // POST /transaction
  createTransaction: async (serviceCode) => {
    return await api.post("/transaction", {
      service_code: serviceCode,
    });
  },

  // GET /transaction/history
  getHistory: async (offset = 0, limit = 5) => {
    return await api.get("/transaction/history", {
      params: { offset, limit },
    });
  },
};
