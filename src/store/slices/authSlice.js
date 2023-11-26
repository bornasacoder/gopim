import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  authState: false,
  authUser: "",
  messageReceiverId: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.authState = action.payload;
    },
    setAuthUser(state, action) {
      state.authUser = action.payload;
    },
    setReceiverId(state, action) {
      // Add a new reducer to set the receiver ID
      state.messageReceiverId = action.payload;
    },
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

export const { setAuthState, setAuthUser, setReceiverId } = authSlice.actions;
export const selectAuthState = (state) => state.auth.authState;
export const selectAuthUser = (state) => state.auth.authUser;
export const selectReceiverId = (state) => state.auth.messageReceiverId;
export default authSlice.reducer;
