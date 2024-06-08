import { Slider as OriginalSlider } from "antd";
import { createStyles } from "antd-style";
import { SliderBaseProps } from "antd/es/slider";
import { ComponentTokenMap } from "antd/es/theme/interface";
import { SliderSingleProps } from "antd/lib";
import { SliderRangeProps } from "antd/lib/slider";
import merge from "deepmerge";
import type { SliderRef } from "rc-slider/lib/Slider";
import * as React from "react";
import { PartialDeep } from "type-fest";

const useSliderStyles = createStyles(
  ({ prefixCls, responsive, css, token }) => {
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
  }
);

export const Slider = React.forwardRef<
  SliderRef,
  SliderSingleProps | SliderRangeProps
>((props, ref) => {
  const slider = useSliderStyles();

  const defaultProps: SliderBaseProps = {
    tooltip: {
      rootClassName: slider.styles.tooltip,
      open: false,
    },
  };

  const mergedProps = merge(defaultProps, props);
  return <OriginalSlider ref={ref} {...mergedProps} />;
});

Slider.displayName = "Slider";

export const SliderComopnentToken: PartialDeep<ComponentTokenMap["Slider"]> =
  {};
