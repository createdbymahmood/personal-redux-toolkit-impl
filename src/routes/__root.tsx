import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { RouteContext } from "../app";

export const Route = createRootRouteWithContext<RouteContext>()({
  component: () => <Outlet />,
});
