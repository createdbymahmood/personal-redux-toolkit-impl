import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/$lang/_auth/(cms)/dashboard/posts"
)({
  component: () => <div>Hello /$lang/_auth/dashboard/posts!</div>,
});
