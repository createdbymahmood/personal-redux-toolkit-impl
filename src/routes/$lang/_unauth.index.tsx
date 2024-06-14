import { createFileRoute } from "@tanstack/react-router";
import { useLoginMutation } from "../../app/services/auth";
import { memo } from "react";

export const Route = createFileRoute("/$lang/_unauth/")({
  component: memo(Login),
});

function Login() {
  const [login] = useLoginMutation();

  return (
    <div>
      <button
        onClick={() => {
          login({});
        }}
      >
        login
      </button>
    </div>
  );
}
