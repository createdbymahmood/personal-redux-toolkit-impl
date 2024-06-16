import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Card } from "antd";
import { memo } from "react";

export const Route = createFileRoute("/$lang/_auth/dashboard")({
  component: memo(() => (
    <Card>
      <Outlet />
    </Card>
  )),
});
