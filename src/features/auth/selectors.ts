import { RootState } from "../../app/store";
import { makeSubSelector } from "../../lib/redux";
import { AuthState } from "./auth-slice";

export const getMap = (state: RootState) => state.auth;
const makeMapStateSelector = makeSubSelector<AuthState>(getMap);

const getIsAuthenticated = makeMapStateSelector("isAuthenticated");
const getIsInitialized = makeMapStateSelector("isInitialized");
const getToken = makeMapStateSelector("token");
const getUser = makeMapStateSelector("user");

export const authSelectors = {
  getIsAuthenticated,
  getIsInitialized,
  getToken,
  getUser,
};
