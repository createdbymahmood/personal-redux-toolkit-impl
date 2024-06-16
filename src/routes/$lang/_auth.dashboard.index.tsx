import {
  ErrorComponentProps,
  createFileRoute,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { Button, Result } from "antd";
import { get } from "lodash-es";
import * as React from "react";
import { z } from "zod";
import { RuoterCode, routerCodeMessagesMap } from "../../utils/error";

export const Route = createFileRoute("/$lang/_auth/dashboard/")({
  component: React.memo(Dashboard),
  validateSearch: z.object({
    pageIndex: z.number(),
    enabled: z.boolean(),
    categories: z.array(z.string()),
  }),
  errorComponent: ErrorComponent,
});

const routerErrorToClientMessage = (error: unknown) => {
  return get(
    routerCodeMessagesMap,
    (error as { routerCode: RuoterCode })?.routerCode
  );
};

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const { title, description } = routerErrorToClientMessage(error);
  const navigate = useNavigate();
  const lang = Route.useRouteContext({ select: s => s.lang });

  return (
    <Result
      status={403}
      title={title}
      subTitle={description}
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate({
              to: "/$lang/dashboard",
              search: { categories: ["Salam"], enabled: false, pageIndex: 1 },
              params: { lang: lang },
            });
          }}
        >
          Retry
        </Button>
      }
    ></Result>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const lang = Route.useRouteContext({ select: s => s.lang });

  const update = () => {
    navigate({
      to: "/$lang/dashboard",
      params: { lang },
      search: {
        pageIndex: 0,
        enabled: true,
        categories: ["Salam", "Query", "String"],
      },
    });
  };

  return (
    <div>
      <pre>{JSON.stringify(location.search, null, 2)}</pre>
      <button onClick={update}>update</button>
    </div>
  );
}
