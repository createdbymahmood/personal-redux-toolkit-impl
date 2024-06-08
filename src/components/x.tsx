import React from "react";
import { Slider } from "./ui/slider";

export function X() {
  return (
    <Slider
      value={20}
      tooltip={{
        open: true,
      }}
    />
  );
}
