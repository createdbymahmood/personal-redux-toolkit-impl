import { createAction, createSlice } from "@reduxjs/toolkit";
import { authApiFns } from "../../app/services/auth";
import type { User } from "../../app/services/auth";
import type { RootState } from "../../app/store";
import { assign } from "lodash-es";
import { user } from "../../mocks/handlers";

export type AuthState = {
  user: null | User;
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
};

export type AuthSlice = typeof slice;

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isInitialized: false,
};

const tokenReceived = createAction<{}>("token-received");

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(tokenReceived, (state, action) => {
      state.user = user;
      state.isAuthenticated = true;
      state.isInitialized = true;
    });

    /* LOGIN  */
    builder
      .addMatcher(authApiFns.endpoints.login.matchPending, (state, action) => {
        console.log("pending", action);
      })
      .addMatcher(
        authApiFns.endpoints.login.matchFulfilled,
        (state, action) => {
          console.log("fulfilled", action);
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          state.isInitialized = true;
        }
      )
      .addMatcher(authApiFns.endpoints.login.matchRejected, (state, action) => {
        console.log("rejected", action);
        state.isInitialized = true;
      })

      /* Initialize SESSION */
      .addMatcher(
        authApiFns.endpoints.refetchSession.matchPending,
        (state, action) => {
          console.log("pending", action);
        }
      )
      .addMatcher(
        authApiFns.endpoints.refetchSession.matchFulfilled,
        (state, action) => {
          console.log("fulfilled", action);
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          state.isInitialized = true;
        }
      )
      .addMatcher(
        authApiFns.endpoints.refetchSession.matchRejected,
        (state, action) => {
          console.log("rejected", action);
          state.isInitialized = true;
          state.isAuthenticated = false;
          state.token = null;
          state.user = null;
        }
      )
      .addMatcher(authApiFns.endpoints.logout.matchPending, (state, action) => {
        console.log("logout", action);
      })
      .addMatcher(
        authApiFns.endpoints.logout.matchFulfilled,
        (state, action) => {
          console.log("logout", action);
          // assign(state, initialState);
          state.isAuthenticated = false;
          state.isInitialized = true;
          state.token = null;
          state.user = null;
        }
      );
  },
});

export default slice.reducer;
export const authActions = { ...slice.actions, tokenReceived };

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
