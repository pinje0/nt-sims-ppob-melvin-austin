import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/api";

// --- Thunks (API Calls) ---
export const fetchProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/profile");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Gagal memuat profile");
    }
  }
);

export const fetchBalance = createAsyncThunk(
  "user/fetchBalance",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/balance");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Gagal memuat saldo");
    }
  }
);

const initialState = {
  profile: {
    email: "",
    first_name: "",
    last_name: "",
    profile_image: null,
  },
  balance: 0,
  showBalance: false, // Tambahan untuk toggle mata
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleBalanceVisibility: (state) => {
      state.showBalance = !state.showBalance;
    },
    // Reducer manual (opsional jika masih butuh clear saat logout)
    clearUser: (state) => {
      state.profile = initialState.profile;
      state.balance = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle Balance
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.balance = action.payload.balance;
      });
  },
});

export const { toggleBalanceVisibility, clearUser } = userSlice.actions;
export default userSlice.reducer;
