import {
  Outlet,
  createFileRoute,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { TabsProps } from "antd/lib";
import { find } from "lodash-es";
import { memo, useMemo, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { Card, Tabs } from "src/components/ui";

export const Route = createFileRoute("/$lang/_auth/dashboard/content/_layout")({
  component: memo(() => {
    const location = useLocation();
    const navigate = useNavigate();

    const [, { language }] = useTranslation();
    const items: TabsProps["items"] = [
      {
        key: `/dashboard/content/posts`,
        label: "Posts",
      },
      {
        key: `/dashboard/content/comments`,
        label: "Comments",
      },
      {
        key: `/dashboard/content/users`,
        label: "Users",
      },
    ];
    return (
      <Card>
        <Tabs
          activeKey={location.href.replace(`/${language}`, "")}
          items={items}
          onChange={value => navigate({ to: `/${language}${value}` })}
        />
        <Outlet />
      </Card>
    );
  }),
});
