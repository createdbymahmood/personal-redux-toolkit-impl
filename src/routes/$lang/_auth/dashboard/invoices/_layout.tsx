import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useTheme } from "antd-style";
import { useState } from "react";
import { Card, Segmented } from "src/components/ui";

const optionsMap = new Map([
  ["Daily", <div>Salam daily</div>],
  ["Weekly", <div>Salam weekly</div>],
]);

const _optionsMap = {
  Daily: <div>Salam daily</div>,
  Weekly: <div>Salam weekly</div>,
};

export const Route = createFileRoute("/$lang/_auth/dashboard/invoices/_layout")(
  {
    component: () => {
      const theme = useTheme();
      const [segmentedValue, setSegmentedValue] = useState<string>("Daily");
      const el = optionsMap.get(segmentedValue);
      return (
        <div>
          <Segmented<string>
            options={["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]}
            onChange={setSegmentedValue}
          />
          {el}
          <Card style={{ marginTop: theme.marginLG }}>
            <Outlet />
          </Card>
        </div>
      );
    },
  }
);
