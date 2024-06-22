import {
  Link,
  Redirect,
  Router,
  createFileRoute,
  redirect,
} from "@tanstack/react-router";
import { memo } from "react";
import { prefetchAuth } from "../../../app/services/auth";
import { routeTree } from "../../../routeTree.gen";
import { message } from "src/components/ui";

const defaultNoAccessFallbackRoute: Redirect = {
  to: "/$lang/dashboard/content",
  params: p => p,
  search: { categories: ["String"], enabled: true, pageIndex: 1 },
};

type BeforeLoadOptions = {
  cause: "preload" | "enter" | "stay";
};

const beforeLoad = (opts: BeforeLoadOptions) => {
  const hasAccess = false;

  if (opts.cause === "preload" || hasAccess) return;

  message.error("Access restricted");
  throw redirect(defaultNoAccessFallbackRoute);
};

export const Route = createFileRoute("/$lang/_auth/another")({
  component: memo(Another),
  loader: ({ context: { dispatch } }) => prefetchAuth.session(dispatch),
});

function Another() {
  const query = Route.useLoaderData();
  return (
    <pre>
      {JSON.stringify(query, null, 2)}

      <Link
        to="/$lang/dashboard/content"
        params={p => ({ lang: p.lang as string })}
        search={{ categories: ["Salam"], enabled: false, pageIndex: 1 }}
      >
        Salam
      </Link>
    </pre>
  );
}
