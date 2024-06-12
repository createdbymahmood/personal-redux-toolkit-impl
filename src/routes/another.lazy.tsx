import { createFileRoute } from "@tanstack/react-router";
import { authApi } from "../app/services/auth";
import { Button } from "antd";
import { Slider } from "../components/ui";

export const Route = createFileRoute("/another")({
  component: () => (
    <div>
      <Slider />
    </div>
  ),
  loader: ({ context }) =>
    context.dispatch(authApi.endpoints.refetchSession.initiate(undefined)),
  pendingComponent: () => "pending...",
});
