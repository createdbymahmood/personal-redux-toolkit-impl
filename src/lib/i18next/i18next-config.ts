import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ns1 from "./ns1.json";
import errors from "./errors.json";

export const defaultNS = "ns1";

export const resources = {
  en: { ns1, errors },
} as const;

i18n.use(initReactI18next).init({
  lng: "en",
  ns: ["ns1"],
  defaultNS,
  resources,
});

export default i18n;
