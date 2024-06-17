import { ErrorRouteComponent, useRouter } from "@tanstack/react-router";
import { Button, Result } from "antd";
import { useCallback } from "react";
import { routerErrorToClientMessage } from "../../utils/error";
import { ZodError, z } from "zod";

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
