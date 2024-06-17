import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/$lang/_auth/dashboard/content/_layout/posts/"
)({
  component: () => (
    <div>
      Hello /$lang/_auth/dashboard/content/_layout/posts/!
      <Link
        to="/$lang/dashboard/content/posts/$postId"
        params={{ postId: 1, lang: "en" }}
      >
        Post Details
      </Link>
    </div>
  ),
});
