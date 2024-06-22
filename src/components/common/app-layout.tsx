import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { createStyles, useTheme } from "antd-style";
import React, { useMemo, useState } from "react";

import { MailOutlined } from "@ant-design/icons";
import { nanoid } from "@reduxjs/toolkit";
import {
  Link,
  Outlet,
  ReactNode,
  useLocation,
  useRouterState,
} from "@tanstack/react-router";
import { useUpdateEffect } from "ahooks";
import { get, noop } from "lodash-es";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { LanguageToggle } from "./language-toggle";
import { auth } from "src/app/services/auth";
import {
  MenuProps,
  Flex,
  Typography,
  Button,
  Menu,
  Layout,
} from "src/components/ui";

type MenuItem = Required<MenuProps>["items"][number];

function findKeyAndParent(
  menuItems: MenuItem[],
  targetKey: string
): { targetKey: string | null; parentKey: string | null } {
  function recurse(
    items: MenuItem[],
    parentKey: string | null
  ): { targetKey: string | null; parentKey: string | null } {
    for (const item of items) {
      if (item?.key === targetKey) {
        return { targetKey: item.key, parentKey };
      }
      /* @ts-ignore */
      if (item.children) {
        /* @ts-ignore */
        const result = recurse(item.children, item.key);
        if (result.targetKey) {
          return result;
        }
      }
    }
    return { targetKey: null, parentKey: null };
  }

  return recurse(menuItems, null);
}
const sidebarMenuItems: MenuItem[] = [
  {
    key: "sub1",
    label: "Navigation One",
    icon: <MailOutlined />,
    children: [
      {
        key: "/dashboard",
        label: (
          <Link
            to="/$lang/dashboard/content"
            params={p => ({ lang: p.lang as string })}
            search={{ categories: ["Category"], enabled: true, pageIndex: 2 }}
          >
            Dashboard
          </Link>
        ),
      },
      {
        key: "/invoices",
        label: (
          <Link
            to="/$lang/dashboard/invoices"
            params={p => ({ lang: p.lang as string })}
          >
            Invoices
          </Link>
        ),
        children: [
          {
            key: "/invoices/id",
            label: (
              <Link
                to="/$lang/dashboard/invoices/$invoiceId"
                params={p => ({
                  ...p,
                  lang: p.lang as string,
                  invoiceId: nanoid(),
                })}
              >
                InvoiceId
              </Link>
            ),
          },
        ],
      },

      {
        key: "/another",
        label: (
          <Link to="/$lang/another" params={p => ({ lang: p.lang as string })}>
            Another Page
          </Link>
        ),
        icon: <div>Icon</div>,
      },
    ],
  },
];

const SiderMenu: React.FC = () => {
  const location = useLocation({});
  const currentUrl = location.href;
  const activeMenuItems = findKeyAndParent(sidebarMenuItems, currentUrl);
  const defaultSelectedKeys = [activeMenuItems.targetKey] as string[];
  const defaultOpenKeys = ["sub1"] as string[];

  return (
    <Menu
      mode="inline"
      items={sidebarMenuItems}
      style={{ flex: 1 }}
      defaultSelectedKeys={defaultSelectedKeys}
      defaultOpenKeys={defaultOpenKeys}
    />
  );
};

const useLayoutStyles = createStyles(({ token }) => {
  return {
    root: {
      height: "100vh",
    },
    logo: {
      height: 64,
      padding: token.marginMD,
    },
    trigger: {
      height: 64,
      width: 64,
      fontSize: token.fontSize,
    },
    content: {
      margin: "24px 16px",
      padding: 24,
      minHeight: 280,
      background: token.colorBgContainer,
      borderRadius: token.borderRadiusLG,
    },
    header: {
      padding: 0,
      background: token.colorBgContainer,
    },
    logout: {
      margin: token.marginMD,
    },
  };
});

type AppLayoutProps = {
  children: ReactNode;
};

const useApplyRouteSpinner = () => {
  const loadingActionMap = useMemo(
    () => ({
      true: NProgress.start,
      false: NProgress.done,
    }),
    []
  );
  const isLoading = useRouterState({ select: s => s.isLoading });
  const effect = get(loadingActionMap, String(isLoading), noop);
  useUpdateEffect(() => void effect(), [isLoading]);
};

const SiderHeader = () => {
  const layout = useLayoutStyles();
  const theme = useTheme();
  // useApplyRouteSpinner();

  return (
    <Flex
      align="center"
      justify="start"
      className={layout.styles.logo}
      gap={theme.marginLG}
    >
      <Typography.Text>Salam</Typography.Text>
    </Flex>
  );
};

export const AppLayout: React.FC<AppLayoutProps> = () => {
  const [collapsed, setCollapsed] = useState(false);
  const layout = useLayoutStyles();
  const [logout, { isLoading: isLoggingOut }] = auth.useLogoutMutation();

  return (
    <Layout className={layout.styles.root}>
      <Layout.Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        width={250}
      >
        <SiderHeader />
        <SiderMenu />
        <Button
          loading={isLoggingOut}
          danger
          onClick={() => logout().unwrap()}
          className={layout.styles.logout}
        >
          Logout
        </Button>
        <LanguageToggle />
      </Layout.Sider>

      <Layout>
        <Layout.Header className={layout.styles.header}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className={layout.styles.trigger}
            style={{ width: 64 }}
          />
        </Layout.Header>
        <Layout.Content className={layout.styles.content}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
