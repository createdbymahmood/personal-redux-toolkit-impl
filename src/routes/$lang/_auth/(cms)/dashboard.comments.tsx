import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_auth/(cms)/dashboard/comments")({
  component: () => <div>Hello /$lang/_auth/dashboard/comments!</div>,
});
