import { retry } from "@reduxjs/toolkit/query/react";
import { api } from "./api";
import { AppDispatch } from "../store";
import { message } from "antd";

export interface Post {
  id: number;
  name: string;
  fetched_at: string;
}

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export const authApi = api
  .injectEndpoints({
    endpoints: build => ({
      login: build.mutation<{ token: string; user: User }, unknown>({
        query: (credentials: any) => ({
          url: "login",
          method: "POST",
          body: credentials,
        }),

        extraOptions: {
          backoff: () => {
            // We intentionally error once on login, and this breaks out of retrying. The next login attempt will succeed.
            retry.fail({ fake: "error" });
          },
        },
      }),
      refetchSession: build.query<{ user: User; token: string }, void>({
        query: () => ({
          url: "me",
          method: "GET",
        }),
      }),

      refreshToken: build.query<{ user: User; token: string }, void>({
        query: () => ({
          url: "refreshToken/value",
          method: "POST",
        }),
      }),
      logout: build.mutation<{ terminateSession: boolean }, void>({
        query: () => ({
          url: "logout",
          method: "POST",
        }),
      }),
      getPokemonByName: build.query({
        query: page => `pokemon?offset=${page * 20}&limit=20`,
        // Only have one cache entry because the arg always maps to one string
        serializeQueryArgs: ({ endpointName }) => {
          return endpointName;
        },
        // Always merge incoming data to the cache entry
        merge: (currentCache, newItems) => {
          currentCache.results.push(...newItems.results);
        },
        // Refetch when the page arg changes
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg;
        },
      }),
    }),
  })
  .enhanceEndpoints({
    endpoints: {
      login: {
        onQueryStarted() {
          message.info("LOGIN Started");
        },
      },
    },
  });

const sleep = (ms: number) =>
  new Promise<void>(resolve => setTimeout(() => resolve(), ms));

export const prefetchAuth = {
  session: async (dispatch: AppDispatch) => {
    // await sleep(0);
    return dispatch(
      authApi.endpoints.refetchSession.initiate(undefined)
    ).unwrap();
  },
};

export const {
  useLoginMutation,
  useRefetchSessionQuery,
  useLazyRefetchSessionQuery,
  useGetPokemonByNameQuery,
  useLogoutMutation,
} = authApi;
