import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  isAuthenticated: false,
  token: null,
  role: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAutheticated: (state, action) => {
      state.isAuthenticated = action.payload;
      if(!action.payload) {
        state.currentUser = null;
      }
      state.loading = false;
    },
    setUser: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.token = action.payload.token;
      state.loading = false;
      state.role = action.payload.role;
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.token = null;
      state.loading = false;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("pendingUser");
    },
  },
});

export const { setLoading, setUser, logoutUser, setAutheticated } = authSlice.actions;
export default authSlice.reducer;
