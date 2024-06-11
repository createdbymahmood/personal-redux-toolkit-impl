import { InputProps, InputRef, Input as OriginalInput } from "antd";
import { createStyles } from "antd-style";
import { ComponentTokenMap } from "antd/es/theme/interface";
import merge from "deepmerge";
import * as React from "react";
import { PartialDeep } from "type-fest";

const useInputStyles = createStyles(({ prefixCls, responsive, css, token }) => {
  return {
    tooltip: css`
      .${prefixCls}-tooltip-inner, .${prefixCls}-tooltip-arrow:after {
        background-color: ${token.blue};

        ${responsive.xs} {
          background: ${token.pink};
        }

        ${responsive.tablet} {
          background: ${token.magenta};
        }

        ${responsive.desktop} {
          background: ${token.orange};
        }
      }
    `,
    t: {
      padding: token.paddingSM,
      background: token.red,

      [responsive.xs]: {
        background: token.blue,
      },
    },
  };
});

export const Input = React.forwardRef<InputRef, InputProps>((props, ref) => {
  const input = useInputStyles();

  const defaultProps: InputProps = {};

  const mergedProps = merge(defaultProps, props);
  return <OriginalInput ref={ref} {...mergedProps} />;
});

Input.displayName = "Input";

export const InputComopnentToken: PartialDeep<ComponentTokenMap["Input"]> = {};
