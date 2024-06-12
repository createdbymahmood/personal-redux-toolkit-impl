import { createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { store, useAppDispatch } from "./app/store";

// Create a new router instance
export const router = createRouter({
  routeTree,
  context: {
    dispatch: store.dispatch,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
