import { useNode } from "@craftjs/core";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import React from "react";

export const ToolbarSection = ({ title, props, summary, children }: any) => {
  const { nodeProps } = useNode((node) => ({
    nodeProps:
      props &&
      props.reduce((res: any, key: any) => {
        res[key] = node.data.props[key] || null;
        return res;
      }, {}),
  }));
  return (
    <Accordion
      sx={{
        background: "transparent",
        boxShadow: "none",
        "&:before": {
          backgroundColor: "rgba(0, 0, 0, 0.05)",
        },
        "&.Mui-expanded": {
          margin: "0 0",
          minHeight: "40px",
          "&:before": {
            opacity: "1",
          },
          "& + .MuiAccordion-root:before ": {
            display: "block",
          },
        },
      }}
    >
      <AccordionSummary
        sx={{
          minHeight: "36px",
          padding: 0,
          "& .MuiAccordionSummary-content": {
            margin: "0px",
          },
        }}
      >
        <Box sx={{ px: 6, width: "100%" }}>
          <Grid container direction="row" alignItems="center" spacing={3}>
            <Grid item xs={4}>
              <Typography
                variant="h5"
                sx={{
                  fontSize: "0.75rem",
                  color: "#A0AEC0",
                  textAlign: "left",
                  fontWeight: "medium",
                }}
              >
                {title}
              </Typography>
            </Grid>
            {summary && props ? (
              <Grid item xs={8}>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: "0.75rem",
                    color: "#A0AEC0",
                    textAlign: "right",
                  }}
                >
                  {summary(
                    props.reduce((acc: any, key: any) => {
                      acc[key] = nodeProps[key];
                      return acc;
                    }, {})
                  )}
                </Typography>
              </Grid>
            ) : null}
          </Grid>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: "0px 24px 20px" }}>
        <Divider />
        <Grid container spacing={1}>
          {children}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
