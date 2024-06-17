import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/$lang/_auth/dashboard/content/_layout/users"
)({
  component: () => <div>Hello /$lang/_auth/dashboard/users!</div>,
});
