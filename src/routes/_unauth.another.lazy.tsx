import { createFileRoute } from "@tanstack/react-router";
import { authApi } from "../app/services/auth";
import { Slider } from "../components/ui/slider";

export const Route = createFileRoute("/_unauth/another")({
  component: () => (
    <div>
      <Slider />
    </div>
  ),
  loader: ({ context }) =>
    context.dispatch(authApi.endpoints.refetchSession.initiate(undefined)),
  pendingComponent: () => "pending...",
});
