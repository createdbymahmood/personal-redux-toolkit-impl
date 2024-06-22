import { createFileRoute } from "@tanstack/react-router";
import { File } from "lucide-react";
import { memo } from "react";
import { auth } from "src/app/services/auth";
import { Select } from "src/components/ui/select";

export const Route = createFileRoute(
  "/$lang/_auth/dashboard/content/_layout/comments"
)({
  component: memo(() => {
    auth.useRefetchSessionQuery(undefined, {
      selectFromResult: s => ({ user: s.data?.user, isLoading: s.isLoading }),
    });

    return (
      <div>
        <Select
          placeholder="How are you?"
          style={{ width: 320 }}
          options={[{ label: "Salam", value: "S" }]}
          menuItemSelectedIcon={<File size={16} />}
        />
      </div>
    );
  }),
});
