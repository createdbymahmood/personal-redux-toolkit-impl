import { retry } from "@reduxjs/toolkit/query/react";
import { api } from "./api";

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

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<{ token: string; user: User }, any>({
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
  }),
});

export const {
  useLoginMutation,
  useRefetchSessionQuery,
  useLazyRefetchSessionQuery,
} = authApi;
