import { ConfigProvider } from "antd";
import { ReactNode } from "react";

export const ThemeConfigProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "SF Mono, SF Arabic",
        },
        components: {
          Menu: {},
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
