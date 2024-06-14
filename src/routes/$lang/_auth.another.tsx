import { Link, createFileRoute } from "@tanstack/react-router";
import { prefetchAuth } from "../../app/services/auth";
import { memo } from "react";

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
        to="/$lang/dashboard/"
        params={{ lang: "fa" }}
        search={{ categories: ["Salam"], enabled: false, pageIndex: 1 }}
      >
        Salam
      </Link>
    </pre>
  );
}
