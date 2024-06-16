import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Card } from "antd";

export const Route = createFileRoute("/$lang/_auth/dashboard")({
  component: () => (
    <Card>
      <Outlet />
    </Card>
  ),
});
