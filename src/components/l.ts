import { Grid } from "antd";
import { Breakpoint } from "antd/lib";
import { CSSProperties } from "react";

// Define the props for useResponsiveValue
type UseCStylesProps<T> = {
  defaultValue: T;
} & Partial<Record<Breakpoint, T>>;

// Utility function to handle the breakpoints
export const useResponsiveValue = <T>(values: UseCStylesProps<T>): T => {
  const breakpoints = Grid.useBreakpoint();

  const orderedBreakpoints: Breakpoint[] = [
    "xxl",
    "xl",
    "lg",
    "md",
    "sm",
    "xs",
  ];

  // Iterate over the breakpoints in order of priority
  for (const breakpoint of orderedBreakpoints) {
    if (breakpoints[breakpoint] && values[breakpoint] !== undefined) {
      return values[breakpoint]!;
    }
  }

  // Return the default value if no breakpoint matches
  return values.defaultValue;
};
