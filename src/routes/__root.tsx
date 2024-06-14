import {
  createRootRouteWithContext,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { RouteContext } from "../app";
import { memo } from "react";

export const Route = createRootRouteWithContext<RouteContext>()({
  component: memo(() => <Outlet />),
  beforeLoad({ context, ...props }) {
    if (!(props.params as { lang: string })?.lang) {
      throw redirect({ to: "/$lang/another", params: { lang: context.lang } });
    }
  },
});
