import { FormControlLabel, Radio } from "@mui/material";
import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import React from "react";

function StyledRadio(props: any) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<CheckCircle sx={{ color: "rgb(19, 115, 230)" }} />}
      icon={<RadioButtonUnchecked sx={{ color: "rgb(142, 142, 142)" }} />}
      {...props}
    />
  );
}

export const ToolbarRadio = ({ value, label }: any) => {
  return (
    <FormControlLabel
      value={value}
      control={<StyledRadio />}
      label={label}
      sx={{ fontSize: "15px" }}
    />
  );
};
