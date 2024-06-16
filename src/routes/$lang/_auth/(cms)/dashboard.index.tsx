import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_auth/(cms)/dashboard/")({
  component: () => null,
  beforeLoad(opts) {
    if (opts.cause === "preload") return;
    opts.navigate({ to: "/$lang/dashboard/posts", params: { lang: "en" } });
  },
});
