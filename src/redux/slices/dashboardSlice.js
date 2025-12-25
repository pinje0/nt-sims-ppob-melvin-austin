import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/api"; // Import instance API Anda

// --- Thunks ---

export const fetchProfile = createAsyncThunk(
  "dashboard/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      // Tidak perlu header Authorization manual, interceptor yang handle
      const response = await api.get("/profile");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Gagal memuat profile");
    }
  }
);

export const fetchBalance = createAsyncThunk(
  "dashboard/fetchBalance",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/balance");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Gagal memuat saldo");
    }
  }
);

export const fetchServices = createAsyncThunk(
  "dashboard/fetchServices",
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
  "dashboard/fetchBanners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/banner"); // Public API
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Gagal memuat banner");
    }
  }
);

// --- Slice ---

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    profile: {
      email: "",
      first_name: "",
      last_name: "",
      profile_image: "/img/profile-placeholder.png", // Default local placeholder
    },
    balance: 0,
    services: [],
    banners: [],
    isLoading: false,
    showBalance: false, // State toggle mata
  },
  reducers: {
    toggleBalanceVisibility: (state) => {
      state.showBalance = !state.showBalance;
    },
  },
  extraReducers: (builder) => {
    builder
      // Profile
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      // Balance
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.balance = action.payload.balance;
      })
      // Services
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.services = action.payload;
      })
      // Banners
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.banners = action.payload;
      });
  },
});

export const { toggleBalanceVisibility } = dashboardSlice.actions;
export default dashboardSlice.reducer;
