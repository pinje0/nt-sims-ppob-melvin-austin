import { api } from "./api";

export const balanceAPI = {
  // GET /balance
  getBalance: async () => {
    return await api.get("/balance");
  },

  // POST /topup
  topUp: async (amount) => {
    return await api.post("/topup", {
      top_up_amount: amount,
    });
  },
};
