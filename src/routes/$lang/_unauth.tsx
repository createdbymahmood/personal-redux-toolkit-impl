import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { memo } from "react";
import { z } from "zod";

export const Route = createFileRoute("/$lang/_unauth")({
  component: memo(() => <Outlet />),
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),

  beforeLoad({ context, search }) {
    if (context.isAuth)
      throw redirect({
        to: search.redirect,
      });
  },
  shouldReload: true,
});
