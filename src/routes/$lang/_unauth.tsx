import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { memo } from "react";
export const Route = createFileRoute("/$lang/_unauth")({
  component: memo(() => <Outlet />),
  beforeLoad({ context }) {
    console.log({ isAuth: context.isAuth });

    if (context.isAuth)
      throw redirect({
        to: "/$lang/dashboard",
        params: { lang: context.lang },
        search: { categories: ["Category"], enabled: true, pageIndex: 0 },
      });
  },
  shouldReload: true,
});
