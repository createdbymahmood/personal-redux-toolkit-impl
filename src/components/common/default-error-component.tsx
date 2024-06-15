import { ErrorRouteComponent, useRouter } from "@tanstack/react-router";
import { Button, Result } from "antd";
import { useCallback } from "react";

export const DefaultErrorComponent: ErrorRouteComponent = ({
  error,
  reset,
  info,
}) => {
  const router = useRouter();
  const resetError = useCallback(() => {
    reset?.();
    router.invalidate();
  }, []);

  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button type="primary" onClick={resetError}>
          Retry
        </Button>
      }
    />
  );
};
