import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { Mutex } from "async-mutex";
import { auth } from "../../features/auth/auth-slice";
import { toast } from "sonner";
import { useNetwork } from "ahooks";

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: "/",
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authentication", `Bearer ${token}`);
    }
    return headers;
  },
});
const mutex = new Mutex();
type PromiseT<Data = any> = Promise<Data> | (() => Promise<Data>);

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      const promise = baseQuery("/refreshToken", api, extraOptions);
      try {
        toast.promise(promise as PromiseT<{ data: unknown }>, {
          loading: "Refreshing user...",
          success: refreshResult => {
            console.log(refreshResult);
            if (refreshResult.data) {
              api.dispatch(auth.tokenReceived(refreshResult.data));
              // retry the initial query
              (async () => {
                result = await baseQuery(args, api, extraOptions);
              })();
              return `Success`;
            } else {
              api.dispatch(auth.logout());
              throw new Error();
            }
          },
          error: `Something went wrong`,
        });
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

const baseQueryWithRetry = retry(baseQueryWithReauth, { maxRetries: 0 });

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
export const api = createApi({
  /**
   * `reducerPath` is optional and will not be required by most users.
   * This is useful if you have multiple API definitions,
   * e.g. where each has a different domain, with no interaction between endpoints.
   * Otherwise, a single API definition should be used in order to support tag invalidation,
   * among other features
   */
  reducerPath: "api",
  /**
   * A bare bones base query would just be `baseQuery: fetchBaseQuery({ baseUrl: '/' })`
   */
  baseQuery: baseQueryWithRetry,
  /**
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   */
  tagTypes: ["Time", "Posts", "Counter"],
  /**
   * This api has endpoints injected in adjacent files,
   * which is why no endpoints are shown below.
   * If you want all endpoints defined in the same file, they could be included here instead
   */
  endpoints: () => ({}),
});

export const enhancedApi = api.enhanceEndpoints({
  endpoints: () => ({
    getPost: () => "test",
  }),
});
