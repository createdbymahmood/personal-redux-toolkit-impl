import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/$lang/_auth/dashboard/invoices/$invoiceId"
)({
  component: () => (
    <div>
      Hello
      /$lang/_auth/dashboard/invoices/$invoiceId/_auth/dashboard/invoices/$invoiceId!
    </div>
  ),
});
