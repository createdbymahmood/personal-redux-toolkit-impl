import { Slider as OriginalSlider } from "antd";
import { createStyles } from "antd-style";
import * as React from "react";
import type { SliderRef } from "rc-slider/lib/Slider";
import { SliderSingleProps } from "antd/lib";
import merge from "deepmerge";

const useSliderStyles = createStyles(
  ({ prefixCls, responsive, css, token }) => {
    return {
      tooltip: css`
        .${prefixCls}-tooltip-inner, .${prefixCls}-tooltip-arrow:after {
          box-shadow: none;
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
    };
  }
);

export const Slider = React.forwardRef<SliderRef, SliderSingleProps>(
  (props, ref) => {
    const slider = useSliderStyles();

    const defaultProps: SliderSingleProps = {
      tooltip: {
        rootClassName: slider.styles.tooltip,
        open: false,
      },
    };
    const mergedProps = merge(defaultProps, props);
    return <OriginalSlider ref={ref} {...mergedProps} />;
  }
);
Slider.displayName = "Slider";
