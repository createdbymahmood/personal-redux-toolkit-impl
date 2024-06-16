import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import * as React from "react";
import { AppLayout } from "../../components/common";

export const Route = createFileRoute("/$lang/_auth")({
  component: React.memo(AppLayout),

  beforeLoad({ context, ...props }) {
    if (!(props.params as { lang: string })?.lang || !context.isAuth) {
      throw redirect({
        to: "/$lang",
        params: { lang: context.lang },
        search: {
          redirect: props.location.href,
        },
      });
    }
  },
});
