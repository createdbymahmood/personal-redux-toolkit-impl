import { z } from "zod";
import i18n from "../lib/i18next/i18next-config";
import { ArrayValues } from "type-fest";
import { get } from "lodash-es";

const ROUTER_CODE = ["PARSE_PARAMS", "VALIDATE_SEARCH"] as const;

type ErrorDescription = { title: string; description: string };
const isRouterError = (error: unknown) => {
  return z
    .object({
      routerCode: z.enum(ROUTER_CODE),
    })
    .parse(error);
};

export const routerCodeMessagesMap: Record<RuoterCode, ErrorDescription> = {
  PARSE_PARAMS: {
    title: i18n.t("errors:PARSE_PARAMS.title"),
    description: i18n.t("errors:PARSE_PARAMS.description"),
  },
  VALIDATE_SEARCH: {
    title: i18n.t("errors:VALIDATE_SEARCH.title"),
    description: i18n.t("errors:VALIDATE_SEARCH.description"),
  },
};

export type RuoterCode = ArrayValues<typeof ROUTER_CODE>;

export const routerErrorToClientMessage = (error: unknown) => {
  return get(
    routerCodeMessagesMap,
    (error as { routerCode: RuoterCode })?.routerCode
  );
};

const toClientErrorMessage = () => {};
