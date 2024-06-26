import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { AppLayout } from "../../components/common";
import { memo } from "react";

export const Route = createFileRoute("/$lang/_auth")({
  component: memo(AppLayout),

  beforeLoad({ context, ...props }) {
    if (!(props.params as { lang: string })?.lang || !context.isAuth) {
      throw redirect({
        to: "/$lang/login",
        params: { lang: context.lang },
        search: {
          redirect: props.location.href,
        },
      });
    }
  },
});
