import { createAction, createSlice } from "@reduxjs/toolkit";
import { auth } from "../../app/services/auth";
import type { User } from "../../app/services/auth";
import type { RootState } from "../../app/store";
import { user } from "../../mocks/handlers";
import { assign } from "lodash-es";

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
      state.isAuthenticated = true;
      state.isInitialized = true;
    });

    /* LOGIN  */
    builder
      .addMatcher(auth.endpoints.login.matchPending, (state, action) => {
        state.isInitialized = false;
        console.log("pending", action);
      })
      .addMatcher(auth.endpoints.login.matchFulfilled, (state, action) => {
        console.log("fulfilled", action);
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isInitialized = true;
      })
      .addMatcher(auth.endpoints.login.matchRejected, (state, action) => {
        console.log("rejected", action);
        state.isInitialized = true;
      })

      /* Initialize SESSION */
      .addMatcher(
        auth.endpoints.refetchSession.matchPending,
        (state, action) => {
          console.log("pending", action);
        }
      )
      .addMatcher(
        auth.endpoints.refetchSession.matchFulfilled,
        (state, action) => {
          console.log("fulfilled", action);
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          state.isInitialized = true;
        }
      )
      .addMatcher(
        auth.endpoints.refetchSession.matchRejected,
        (state, action) => {
          console.log("rejected", action);
          assign(state, initialState);
        }
      )

      /* LOGOUT */
      .addMatcher(auth.endpoints.logout.matchPending, (state, action) => {
        state.isInitialized = false;
        console.log("logout", action);
      })
      .addMatcher(auth.endpoints.logout.matchFulfilled, (state, action) => {
        console.log("logout", action);
        assign(state, initialState);
      })
      .addMatcher(auth.endpoints.logout.matchRejected, (state, action) => {
        console.log("logout", action);
        // assign(state, initialState);
        assign(state, initialState);
      });
  },
});

export default slice.reducer;
export const authActions = { ...slice.actions, tokenReceived };

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
