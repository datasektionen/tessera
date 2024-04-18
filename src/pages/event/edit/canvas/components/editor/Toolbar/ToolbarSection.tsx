import { useNode } from "@craftjs/core";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const StyledAccordion = styled(Accordion)({
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
});

const StyledAccordionSummary = styled(AccordionSummary)({
  minHeight: "36px",
  padding: 0,
  "& .MuiAccordionSummary-content": {
    margin: "0px",
  },
});

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
    <StyledAccordion>
      <StyledAccordionSummary>
        <div className="px-6 w-full">
          <Grid container direction="row" alignItems="center" spacing={3}>
            <Grid item xs={4}>
              <h5 className="text-sm text-light-gray-1 text-left font-medium text-dark-gray">
                {title}
              </h5>
            </Grid>
            {summary && props ? (
              <Grid item xs={8}>
                <h5 className="text-light-gray-2 text-sm text-right text-dark-blue">
                  {summary(
                    props.reduce((acc: any, key: any) => {
                      acc[key] = nodeProps[key];
                      return acc;
                    }, {})
                  )}
                </h5>
              </Grid>
            ) : null}
          </Grid>
        </div>
      </StyledAccordionSummary>
      <AccordionDetails style={{ padding: "0px 24px 20px" }}>
        <Divider />
        <Grid container spacing={1}>
          {children}
        </Grid>
      </AccordionDetails>
    </StyledAccordion>
  );
};
