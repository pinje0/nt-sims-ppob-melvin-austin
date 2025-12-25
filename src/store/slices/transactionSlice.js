import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/api";

// --- Thunks ---
export const fetchServices = createAsyncThunk(
  "transaction/fetchServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/services");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Gagal memuat layanan");
    }
  }
);

export const fetchBanners = createAsyncThunk(
  "transaction/fetchBanners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/banner");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Gagal memuat banner");
    }
  }
);

const initialState = {
  services: [],
  banners: [],
  transactions: [], // Nanti dipakai untuk riwayat
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    // Reducer synchronous biasa jika perlu
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.services = action.payload;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.banners = action.payload;
      });
  },
});

export default transactionSlice.reducer;
