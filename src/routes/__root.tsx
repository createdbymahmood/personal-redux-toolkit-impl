import {
  createRootRouteWithContext,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { AppDispatch } from "../app/store";

type Context = {
  dispatch: AppDispatch;
};

export function Spinner({
  show,
  wait,
}: {
  show?: boolean;
  wait?: `delay-${number}`;
}) {
  return (
    <div
      className={`inline-block animate-spin px-3 transition ${
        show ?? true
          ? `opacity-1 duration-500 ${wait ?? "delay-300"}`
          : "duration-500 opacity-0 delay-0"
      }`}
    >
      ⍥
    </div>
  );
}

function RouterSpinner() {
  const isLoading = useRouterState({ select: s => s.status === "pending" });
  return <Spinner show={isLoading} />;
}

export const Route = createRootRouteWithContext<Context>()({
  component: () => (
    <div>
      <RouterSpinner />
      <Outlet />
    </div>
  ),
});
