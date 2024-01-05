import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  email: "",
  token: "",
};

const authSlice = createSlice({
  name: "Authentication",
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {
      //   console.log(action);
      state.email = action.payload.email;
      state.token = action.payload.idToken;
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("token", action.payload.idToken);
    },
    logout: (state, action) => {
      state.email = "";
      state.token = "";
      localStorage.removeItem("email");
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
