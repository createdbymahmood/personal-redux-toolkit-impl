import { createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { AppDispatch, store } from "./app/store";

export type RouteContext = {
  dispatch: AppDispatch;
  isAuth: boolean;
};
// Create a new router instance
export const router = createRouter({
  routeTree,
  context: {
    dispatch: store.dispatch,
    isAuth: true,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
