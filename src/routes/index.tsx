import { Link, createFileRoute } from "@tanstack/react-router";
import { authApi } from "../app/services/auth";
import { Button } from "antd";

export const Route = createFileRoute("/")({
  component: Index,

  loader: ({ context }) =>
    context.dispatch(authApi.endpoints.refetchSession.initiate(undefined)),

  onError(err) {
    console.log(err);
  },
  pendingComponent: () => "pending...",
});

function Index() {
  return (
    <div>
      <Button type="text">Salam</Button>
      <Link to="/another">Another</Link>
    </div>
  );
}
