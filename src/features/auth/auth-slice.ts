import { createAction, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../app/services/auth";
import type { User } from "../../app/services/auth";
import type { RootState } from "../../app/store";
import { assign } from "lodash-es";
import { user } from "../../mocks/handlers";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isInitialized: false,
} as {
  user: null | User;
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
};

const logout = createAction<void>("logout");
const tokenReceived = createAction<{}>("token-received");

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(logout, (state, action) => {
        // action is inferred correctly here if using TS
        console.log("logout", initialState);
        assign(state, initialState);
      })
      .addCase(tokenReceived, (state, action) => {
        state.user = user;
      });

    /* LOGIN  */
    builder
      .addMatcher(authApi.endpoints.login.matchPending, (state, action) => {
        console.log("pending", action);
        state.isInitialized = false;
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        console.log("fulfilled", action);
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isInitialized = true;
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
        console.log("rejected", action);
        state.isInitialized = true;
      })

      /* Initialize SESSION */
      .addMatcher(
        authApi.endpoints.refetchSession.matchPending,
        (state, action) => {
          console.log("pending", action);
          state.isInitialized = false;
        }
      )
      .addMatcher(
        authApi.endpoints.refetchSession.matchFulfilled,
        (state, action) => {
          console.log("fulfilled", action);
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          state.isInitialized = true;
        }
      )
      .addMatcher(
        authApi.endpoints.refetchSession.matchRejected,
        (state, action) => {
          console.log("rejected", action);
          state.isInitialized = true;
        }
      );
  },
});

export default slice.reducer;
export const auth = { ...slice.actions, logout, tokenReceived };

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
