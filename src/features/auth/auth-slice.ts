import { createAction, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../app/services/auth";
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
  isInitialized: true,
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
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state, action) => {
        console.log("logout", action);
        assign(state, initialState);
      });
  },
});

export default slice.reducer;
export const authActions = { ...slice.actions, tokenReceived };

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
