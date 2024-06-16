import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_auth/dashboard")({
  component: () => (
    <div>
      OUTLET SLAMA
      <Outlet />
    </div>
  ),
});
