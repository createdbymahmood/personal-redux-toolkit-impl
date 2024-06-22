import { ConfigProvider } from "antd";
import { ReactNode } from "react";

export const ThemeConfigProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <ConfigProvider
      componentSize="large"
      theme={{
        token: {
          fontFamily: "SF Mono, SF Arabic",
          colorPrimary: "#000",
          colorPrimaryActive: "#454545",
          colorPrimaryBg: "#f1f1f1",
        },

        components: {
          Menu: {},
          Input: {
            inputFontSize: 120,
          },
          Select: {
            controlHeight: 40,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
