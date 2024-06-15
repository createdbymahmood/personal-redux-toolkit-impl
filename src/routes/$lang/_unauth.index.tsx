import { createFileRoute } from "@tanstack/react-router";
import { memo } from "react";
import { auth } from "../../app/services/auth";

export const Route = createFileRoute("/$lang/_unauth/")({
  component: memo(Login),
});

function Login() {
  const [login] = auth.useLoginMutation();

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
