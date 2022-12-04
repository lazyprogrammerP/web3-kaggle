import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  loggedIn: false,
  userData: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.loggedIn = action.payload;
    },

    setUserData(state, action) {
      state.userData = action.payload;
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.auth,
        };
      },
    },
  },
});

// Exports for actions
export const { setLoggedIn, setUserData } = authSlice.actions;

// Exports for select statements
export const selectLoggedIn = (state) => state.auth.loggedIn;
export const selectUserData = (state) => state.auth.userData;

export default authSlice.reducer;
