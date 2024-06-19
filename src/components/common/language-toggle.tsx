import { useNavigate } from "@tanstack/react-router";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import i18n from "../../lib/i18next/i18next-config";

export const LanguageToggle = () => {
  const [t, { changeLanguage, language }] = useTranslation();
  const navigate = useNavigate();

  const toggleLanguage = async () => {
    if (language === "en") {
      await changeLanguage("fa", v => {});
    } else {
      await changeLanguage("en");
    }

    navigate({ params: { lang: i18n.language } });
  };

  return (
    <div>
      <Button onClick={toggleLanguage}>Change Language</Button>
    </div>
  );
};
