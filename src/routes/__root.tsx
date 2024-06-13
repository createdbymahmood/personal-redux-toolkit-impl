import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { RouteContext } from "../app";
import { AppLayout } from "../components/common";

export const Route = createRootRouteWithContext<RouteContext>()({
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
});
