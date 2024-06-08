import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Card, Drawer, Layout, Menu, Typography, theme } from "antd";
import React, { useState } from "react";
const { Header, Sider, Content } = Layout;

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "sub1",
    label: "منوی اول",
    icon: <MailOutlined />,
    children: [
      {
        key: "g1",
        label: "داشبورد",
        type: "item",
        // children: [
        //   { key: "1", label: "گزینه ی 1" },
        //   { key: "2", label: "گزینه ی 2" },
        // ],
      },
      {
        key: "g2",
        label: "آیتم دوم",
        type: "group",
        children: [
          { key: "3", label: "گزینه ی 3" },
          { key: "4", label: "گزینه ی 4" },
        ],
      },
    ],
  },
  {
    key: "sub2",
    label: "منوی دوم",
    icon: <AppstoreOutlined />,
    children: [
      { key: "5", label: "گزینه ی 5" },
      { key: "6", label: "گزینه ی 6" },
      {
        key: "sub3",
        label: "Submenu",
        children: [
          { key: "7", label: "گزینه ی 7" },
          { key: "8", label: "گزینه ی 8" },
        ],
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "sub4",
    label: "منوی سوم",
    icon: <SettingOutlined />,
    children: [
      { key: "9", label: "گزینه ی 9" },
      { key: "10", label: "گزینه ی 10" },
      { key: "11", label: "گزینه ی 11" },
      { key: "12", label: "گزینه ی 12" },
    ],
  },
];

const MenuDemo: React.FC = () => {
  const onClick: MenuProps["onClick"] = e => {
    console.log("click ", e);
  };

  return (
    <Menu
      onClick={onClick}
      // style={{ width: 256 }}
      defaultSelectedKeys={["1"]}
      // defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
};

import type { RadioChangeEvent } from "antd";
import { Radio, Tabs } from "antd";
import { useResponsiveValue } from "./components/l";
import { X } from "./components/x";
import { Slider } from "./components/ui/slider";

type TabPosition = "left" | "right" | "top" | "bottom";

const TabsDemo: React.FC = () => {
  const [mode, setMode] = useState<TabPosition>("top");

  const handleModeChange = (e: RadioChangeEvent) => {
    setMode(e.target.value);
  };

  return (
    <div>
      <Radio.Group
        onChange={handleModeChange}
        value={mode}
        style={{ marginBottom: 8 }}
      >
        <Radio.Button value="top">Horizontal</Radio.Button>
        <Radio.Button value="left">Vertical</Radio.Button>
      </Radio.Group>
      <Tabs
        defaultActiveKey="1"
        tabPosition={mode}
        style={{ height: 220 }}
        items={new Array(30).fill(null).map((_, i) => {
          const id = String(i);
          return {
            label: `Tab-${id}`,
            key: id,
            disabled: i === 28,
            children: `Content of tab ${id}`,
          };
        })}
      />
    </div>
  );
};
const App: React.FC = () => {
  const {
    token: {
      colorBgContainer,
      borderRadiusLG,
      paddingMD,
      marginMD,
      paddingLG,
      paddingXL,
    },
    theme: t,
  } = theme.useToken();

  const isMobile = useResponsiveValue({ defaultValue: true, md: false });
  const [collapsed, setCollapsed] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const sidebar = (() => {
    if (isMobile)
      return (
        <Drawer
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          width={256}
          styles={{
            body: {
              padding: 0,
            },
            header: {
              padding: paddingMD,
              border: 0,
            },
          }}
        >
          <MenuDemo />
        </Drawer>
      );
    return (
      <Sider trigger={null} collapsible collapsed={collapsed} width={256}>
        <Header
          style={{
            padding: paddingMD,
            paddingInline: paddingLG,
            background: colorBgContainer,
          }}
        >
          <Typography>سلام</Typography>
        </Header>
        <MenuDemo />
      </Sider>
    );
  })();
  return (
    <Layout style={{ height: "100vh" }}>
      {sidebar}
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => {
              setCollapsed(!collapsed);
              setIsDrawerOpen(ido => !ido);
            }}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: marginMD,
            padding: paddingMD,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* <TabsDemo /> */}

          <Card>
            <Slider
              range
              defaultValue={[10, 20]}
              max={40}
              onChange={v => {
                console.log(v);
              }}
            />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
