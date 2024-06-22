import { Select as OriginalSelect, SelectProps } from "antd";
import { ArrowDown, ChevronDown } from "lucide-react";
import { BaseSelectRef } from "rc-select";
import { forwardRef } from "react";

export const Select = forwardRef<BaseSelectRef, SelectProps>((props, ref) => {
  return (
    <OriginalSelect ref={ref} suffixIcon={<ArrowDown size={16} />} {...props} />
  );
});
