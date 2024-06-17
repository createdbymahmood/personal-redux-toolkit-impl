import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Card, Segmented } from "antd";
import { useTheme } from "antd-style";

export const Route = createFileRoute("/$lang/_auth/dashboard/invoices/_layout")(
  {
    component: () => {
      const theme = useTheme();
      return (
        <div>
          <Segmented<string>
            options={["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]}
            onChange={value => {
              console.log(value); // string
            }}
          />

          <Card style={{ marginTop: theme.marginLG }}>
            <Outlet />
          </Card>
        </div>
      );
    },
  }
);
