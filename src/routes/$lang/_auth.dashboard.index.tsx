import {
  createFileRoute,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { Button, Result } from "antd";
import { get } from "lodash-es";
import * as React from "react";
import { ArrayValues } from "type-fest";
import { z } from "zod";
import i18n from "../../lib/i18next-config";

const ROUTER_CODE = ["PARSE_PARAMS", "VALIDATE_SEARCH"] as const;

type ErrorDescription = { title: string; description: string };

const routerCodeMessagesMap: Record<RuoterCode, ErrorDescription> = {
  PARSE_PARAMS: {
    title: i18n.t("errors:PARSE_PARAMS.title"),
    description: i18n.t("errors:PARSE_PARAMS.description"),
  },
  VALIDATE_SEARCH: {
    title: i18n.t("errors:VALIDATE_SEARCH.title"),
    description: i18n.t("errors:VALIDATE_SEARCH.description"),
  },
};

type RuoterCode = ArrayValues<typeof ROUTER_CODE>;

const isRouterError = (error: unknown) => {
  return z
    .object({
      routerCode: z.enum(ROUTER_CODE),
    })
    .parse(error);
};

const toClientErrorMessage = () => {};

const routerErrorToClientMessage = (error: unknown) => {
  return get(
    routerCodeMessagesMap,
    (error as { routerCode: RuoterCode })?.routerCode
  );
};

export const Route = createFileRoute("/$lang/_auth/dashboard/")({
  component: React.memo(Dashboard),
  validateSearch: z.object({
    pageIndex: z.number(),
    enabled: z.boolean(),
    categories: z.array(z.string()),
  }),
  errorComponent: ({ error, reset }) => {
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
  },
});

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
