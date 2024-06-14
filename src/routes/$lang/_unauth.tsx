import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { memo } from "react";
export const Route = createFileRoute("/$lang/_unauth")({
  component: memo(() => <Outlet />),
  beforeLoad({ context }) {
    console.log(context.isAuth);
    if (context.isAuth)
      throw redirect({
        to: "/$lang/another",
        params: { lang: context.lang },
      });
  },
  shouldReload: true,
});
