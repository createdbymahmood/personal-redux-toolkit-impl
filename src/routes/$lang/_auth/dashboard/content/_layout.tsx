import {
  Outlet,
  createFileRoute,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { Card, Tabs } from "antd";
import { TabsProps } from "antd/lib";

export const Route = createFileRoute("/$lang/_auth/dashboard/content/_layout")({
  component: () => {
    const location = useLocation();
    const navigate = useNavigate();

    const items: TabsProps["items"] = [
      {
        key: "/en/dashboard/content/posts",
        label: "Posts",
        active: location.href.startsWith("/en/dashboard/content/posts"),
      },
      {
        key: "/en/dashboard/content/comments",
        label: "Comments",
        active: location.href.startsWith("/en/dashboard/content/comments"),
      },
      {
        key: "/en/dashboard/content/users",
        label: "Users",
        active: location.href.startsWith("/en/dashboard/content/users"),
      },
    ];

    return (
      <Card>
        <Tabs items={items} onChange={value => navigate({ to: value })} />
        <Outlet />
      </Card>
    );
  },
});
