import {
  Link,
  Redirect,
  createFileRoute,
  redirect,
} from "@tanstack/react-router";
import { message } from "antd";
import { memo } from "react";
import { prefetchAuth } from "../../app/services/auth";
import { z } from "zod";

const defaultNoAccessFallbackRoute: Redirect = {
  to: "/$lang/dashboard",
  params: { lang: "en" },
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
  beforeLoad,
});

function Another() {
  const query = Route.useLoaderData();
  return (
    <pre>
      {JSON.stringify(query, null, 2)}

      <Link
        to="/$lang/dashboard"
        params={{ lang: "fa" }}
        search={{ categories: ["Salam"], enabled: false, pageIndex: 1 }}
      >
        Salam
      </Link>
    </pre>
  );
}
