import { useNode } from "@craftjs/core";
import { Grid, Slider, RadioGroup, Box, Typography } from "@mui/material";
import React from "react";

import { ToolbarDropdown } from "./ToolbarDropdown";
import { ToolbarTextInput } from "./ToolbarTextInput";

export type ToolbarItemProps = {
  prefix?: string;
  label?: string;
  full?: boolean;
  propKey: string;
  index?: number;
  children?: React.ReactNode;
  type: string;
  onChange?: (value: any) => any;
};

export const ToolbarItem = ({
  full = false,
  propKey,
  type,
  onChange,
  index,
  ...props
}: ToolbarItemProps) => {
  const {
    actions: { setProp },
    propValue,
  } = useNode((node) => ({
    propValue: node.data.props[propKey],
  }));
  const value = Array.isArray(propValue) ? propValue[index!] : propValue;

  return (
    <Grid item xs={full ? 12 : 6}>
      <Box sx={{ mb: 2 }}>
        {["text", "color", "bg", "number"].includes(type) ? (
          <ToolbarTextInput
            {...props}
            type={type}
            value={value}
            onChange={(value) => {
              setProp((props: any) => {
                if (Array.isArray(propValue)) {
                  props[propKey][index!] = onChange ? onChange(value) : value;
                } else {
                  props[propKey] = onChange ? onChange(value) : value;
                }
              }, 500);
            }}
          />
        ) : type === "slider" ? (
          <>
            {props.label ? (
              <Typography
                variant="h6"
                sx={{ fontSize: "0.75rem", color: "#A0AEC0" }}
              >
                {props.label}
              </Typography>
            ) : null}
            <Slider
              value={parseInt(value) || 0}
              onChange={
                ((_: any, value: number) => {
                  setProp((props: any) => {
                    if (Array.isArray(propValue)) {
                      props[propKey][index!] = onChange
                        ? onChange(value)
                        : value;
                    } else {
                      props[propKey] = onChange ? onChange(value) : value;
                    }
                  }, 1000);
                }) as any
              }
              sx={{
                color: "#3880ff",
                height: 2,
                padding: "5px 0",
                width: "100%",
              }}
            />
          </>
        ) : type === "radio" ? (
          <>
            {props.label ? (
              <Typography
                variant="h6"
                sx={{ fontSize: "0.75rem", color: "#A0AEC0" }}
              >
                {props.label}
              </Typography>
            ) : null}
            <RadioGroup
              value={value || 0}
              onChange={(e) => {
                const value = e.target.value;
                setProp((props: any) => {
                  props[propKey] = onChange ? onChange(value) : value;
                });
              }}
            >
              {props.children}
            </RadioGroup>
          </>
        ) : type === "select" ? (
          <ToolbarDropdown
            value={value || ""}
            onChange={(value: any) =>
              setProp(
                (props: any) =>
                  (props[propKey] = onChange ? onChange(value) : value)
              )
            }
            {...props}
          />
        ) : null}
      </Box>
    </Grid>
  );
};
