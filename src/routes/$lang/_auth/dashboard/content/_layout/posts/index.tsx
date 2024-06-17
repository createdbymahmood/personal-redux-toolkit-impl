import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/$lang/_auth/dashboard/content/_layout/posts/"
)({
  component: () => (
    <div>
      Hello /$lang/_auth/dashboard/content/_layout/posts/!
      <Link
        to="/$lang/dashboard/content/posts/$postId"
        params={{ postId: "ZXC" as unknown as number, lang: "en" }}
      >
        Post Details
      </Link>
    </div>
  ),
});
