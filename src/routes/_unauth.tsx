import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_unauth")({
  component: () => (
    <div>
      Hello /_unauth!
      <Outlet />
    </div>
  ),
  beforeLoad({ context }) {
    if (context.isAuth) throw redirect({ to: "/" });
  },
});
