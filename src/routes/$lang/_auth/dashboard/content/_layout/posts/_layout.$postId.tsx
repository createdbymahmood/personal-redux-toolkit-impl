import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute(
  "/$lang/_auth/dashboard/content/_layout/posts/_layout/$postId"
)({
  component: () => <div>Some random post content</div>,
  parseParams: params => ({
    postId: z.number().int().parse(Number(params.postId)),
  }),
});
