import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard/")({
  component: () => <div>Hello /(dashboard-route-group)/_auth/dashboard!</div>,
});
