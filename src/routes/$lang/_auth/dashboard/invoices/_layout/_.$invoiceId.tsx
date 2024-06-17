import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/$lang/_auth/dashboard/invoices/_layout//$invoiceId"
)({
  component: () => <div>Hello /$lang/_auth/dashboard/invoices/$invoiceId!</div>,
});
