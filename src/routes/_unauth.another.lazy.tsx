import { createFileRoute } from "@tanstack/react-router";
import { prefetchAuth } from "../app/services/auth";

export const Route = createFileRoute("/_unauth/another")({
  component: Another,
  loader: prefetchAuth.session,
});

function Another() {
  const query = Route.useLoaderData();
  return <pre>{JSON.stringify(query, null, 2)}</pre>;
}
