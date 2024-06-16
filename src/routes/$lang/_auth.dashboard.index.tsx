import {
  ErrorComponentProps,
  createFileRoute,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { Button, Result } from "antd";
import { z } from "zod";
import { routerErrorToClientMessage } from "../../utils/error";
import { memo } from "react";

export const Route = createFileRoute("/$lang/_auth/dashboard/")({
  component: memo(Dashboard),
  validateSearch: z.object({
    pageIndex: z.number(),
    enabled: z.boolean(),
    categories: z.array(z.string()),
  }),
  errorComponent: memo(ErrorComponent),
});

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const { title, description } = routerErrorToClientMessage(error);
  const navigate = useNavigate();
  const lang = Route.useRouteContext({ select: s => s.lang });
  const resetError = () => {
    navigate({
      to: "/$lang/dashboard",
      search: { categories: ["Salam"], enabled: false, pageIndex: 1 },
      params: { lang: lang },
    });
  };

  return (
    <Result
      status={403}
      title={title}
      subTitle={description}
      extra={
        <Button type="primary" onClick={resetError}>
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
