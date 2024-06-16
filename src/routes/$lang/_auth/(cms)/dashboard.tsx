import {
  Outlet,
  createFileRoute,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { Card, Tabs } from "antd";
import { TabsProps } from "antd/lib";

export const Route = createFileRoute("/$lang/_auth/(cms)/dashboard")({
  component: () => {
    const location = useLocation();
    const navigate = useNavigate();
    const items: TabsProps["items"] = [
      {
        key: "/en/dashboard/posts",
        label: "Tab 1",
      },
      {
        key: "/en/dashboard/comments",
        label: "Tab 2",
      },
      {
        key: "/en/dashboard/users",
        label: "Tab 3",
      },
    ];

    return (
      <Card>
        <Tabs
          activeKey={location.href}
          items={items}
          onChange={value => navigate({ to: value })}
        />
        <Outlet />
      </Card>
    );
  },
});
