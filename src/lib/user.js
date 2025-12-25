import { api } from "./api";

export const userAPI = {
  // GET /profile
  getProfile: async () => {
    return await api.get("/profile");
  },

  // PUT /profile/update
  updateProfile: async (data) => {
    return await api.put("/profile/update", {
      first_name: data.first_name,
      last_name: data.last_name,
    });
  },

  // PUT /profile/image
  updateProfileImage: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return await api.put("/profile/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
