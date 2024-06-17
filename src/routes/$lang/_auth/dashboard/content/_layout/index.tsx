import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_auth/dashboard/content/_layout/")(
  {
    component: () => null,
    beforeLoad(opts) {
      if (opts.cause === "preload") return;
      opts.navigate({
        to: "/$lang/dashboard/content/posts",
        params: { lang: "en" },
      });
    },
  }
);
