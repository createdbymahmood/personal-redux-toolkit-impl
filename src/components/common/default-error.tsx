import { ErrorRouteComponent, useRouter } from "@tanstack/react-router";
import { useCallback } from "react";
import { routerErrorToClientMessage } from "src/utils/error";
import { ZodError, z } from "zod";
import Result from "lodash-es/result";
import { Button } from "src/components/ui";

const isValidtionError = (value: unknown) => value instanceof ZodError;

export const DefaultError: ErrorRouteComponent = ({
  error: _error,
  reset,
  info,
}) => {
  const router = useRouter();

  const resetError = useCallback(() => {
    reset?.();
    if (isValidtionError(_error.cause)) return;
    router.invalidate();
  }, []);

  const error = routerErrorToClientMessage(_error);
  return (
    <Result
      status="500"
      title={error.title}
      subTitle={error.description}
      extra={
        <Button type="primary" onClick={resetError}>
          Retry
        </Button>
      }
    />
  );
};
