import { TextField, InputAdornment } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ChromePicker } from "react-color";

export type ToolbarTextInputProps = {
  prefix?: string;
  label?: string;
  type: string;
  onChange?: (value: any) => void;
  value?: any;
};

export const ToolbarTextInput = ({
  onChange,
  value,
  prefix,
  label,
  type,
  ...props
}: ToolbarTextInputProps) => {
  const [internalValue, setInternalValue] = useState(value);
  const [active, setActive] = useState(false);
  useEffect(() => {
    let val = value;
    if (type === "color" || type === "bg")
      val = `rgba(${Object.values(value)})`;
    setInternalValue(val);
  }, [value, type]);

  return (
    <div
      style={{ width: "100%", position: "relative" }}
      onClick={() => {
        setActive(true);
      }}
    >
      {(type === "color" || type === "bg") && active ? (
        <div
          style={{
            position: "absolute",
            zIndex: 99999,
            top: "calc(100% + 10px)",
            left: "-5%",
          }}
        >
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActive(false);
            }}
          ></div>
          <ChromePicker
            color={value}
            onChange={(color: any) => {
              onChange && onChange(color.rgb);
            }}
          />
        </div>
      ) : null}
      <TextField
        label={label}
        style={{ margin: 0, width: "100%" }}
        value={internalValue || ""}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onChange && onChange((e.target as any).value);
          }
        }}
        onChange={(e) => {
          setInternalValue(e.target.value);
        }}
        margin="dense"
        variant="filled"
        InputProps={{
          disableUnderline: true,
          startAdornment: ["color", "bg"].includes(type) ? (
            <InputAdornment
              position="start"
              style={{
                position: "absolute",
                marginTop: "2px",
                marginRight: "8px",
              }}
            >
              <div
                style={{
                  width: "2px",
                  height: "2px",
                  display: "inline-block",
                  borderRadius: "50%",
                  position: "relative",
                  left: "15px",
                  background: internalValue,
                }}
              />
            </InputAdornment>
          ) : null,
        }}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{
          "& .MuiInputBase-root": {
            padding: 0,
            width: "100%",
            borderRadius: "100px",
            border: "none",
            margin: 0,
            marginTop: 7,
            position: "relative",
            background: "#efeff1",
            fontSize: "12px",
            paddingLeft: "28px",
            paddingBottom: "8px",
            paddingTop: "8px",
          },
          "& .MuiInputLabel-root": {
            color: "rgb(128,128,128)",
            fontSize: "18px",
            borderRadius: "100px",
            paddingLeft: "0px",
            paddingTop: "3px",
            marginBottom: "3px",
            position: "relative",
            left: "-12px",
          },
        }}
        {...props}
      />
    </div>
  );
};
