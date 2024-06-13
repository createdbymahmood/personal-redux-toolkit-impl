import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_unauth")({
  component: () => <Outlet />,
  beforeLoad({ context }) {
    // if (context.isAuth) throw redirect({ to: "/" });
  },
});
