import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_auth/dashboard/invoices")({
  component: () => <div>Hello /$lang/_auth/dashboard/invoices!</div>,
});
