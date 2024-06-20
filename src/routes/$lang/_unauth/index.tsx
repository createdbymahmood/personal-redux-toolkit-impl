import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_unauth/")({
  component: () => <div>Hello /$lang/_unauth/_unauth/!</div>,
  beforeLoad() {
    throw redirect({
      to: "/$lang/login",
      params: p => ({ ...p, lang: p.lang as string }),
    });
  },
});
