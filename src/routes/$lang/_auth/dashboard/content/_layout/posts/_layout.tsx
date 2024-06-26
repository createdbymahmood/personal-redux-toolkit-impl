import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
export const Route = createFileRoute(
  "/$lang/_auth/dashboard/content/_layout/posts/_layout"
)({
  component: () => (
    <div>
      <Link
        to="/$lang/dashboard/content/posts"
        params={p => ({
          lang: p.lang as string,
        })}
      >
        <ArrowLeft />
      </Link>

      <Outlet />
    </div>
  ),
});
