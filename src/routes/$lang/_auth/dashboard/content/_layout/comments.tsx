import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/$lang/_auth/dashboard/content/_layout/comments"
)({
  component: () => {
    return <div>Hello /$lang/_auth/dashboard/comments!</div>;
  },
});
