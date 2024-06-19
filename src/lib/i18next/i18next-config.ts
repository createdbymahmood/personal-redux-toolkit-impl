import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ns1 from "./ns1.json";
import errors from "./errors.json";
import LanguageDetector from "i18next-browser-languagedetector";

export const defaultNS = "ns1";

export const resources = {
  en: { ns1, errors },
  fa: { ns1, errors },
} as const;

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    ns: ["ns1"],
    supportedLngs: ["fa", "en"],
    defaultNS,
    resources,
    fallbackLng: "en",
    detection: {
      order: ["path"],
      caches: ["cookie"],
    },
  });

export default i18n;
