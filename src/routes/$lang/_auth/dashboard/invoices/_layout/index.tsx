import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/$lang/_auth/dashboard/invoices/_layout/"
)({
  component: () => (
    <div>
      Hello /$lang/_auth/dashboard/invoices!
      <Outlet />
    </div>
  ),
});
