import { AspectRatio, Typography } from "@mui/joy";
import React from "react";

const WelcomePage = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography level="h1" color="primary" fontSize={48}>
        Tessera
      </Typography>
      <Typography level="h4" color="neutral">
        Ticket Releases should not be a pain.
      </Typography>
    </div>
  );
};

export default WelcomePage;
