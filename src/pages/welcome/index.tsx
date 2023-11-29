import { AspectRatio, Button, Divider, Typography } from "@mui/joy";
import React from "react";
import PALLETTE from "../../theme/pallette";

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
        backgroundColor: PALLETTE.offWhite,
      }}
    >
      <Typography level="h1" color="primary" fontSize={72}>
        Tessera
      </Typography>
      <Typography level="h4" color="neutral">
        Ticket releases should not be a pain.
      </Typography>


      <Typography level="h4" color="neutral" fontSize={14} mt={3}> 
      <Button
        color="neutral"
        disabled={false}
        size="md"
        variant="soft"
        style={{ background: PALLETTE.cerise, marginRight: 10  }}
      >
        Login
      </Button> To secure your spot.
      </Typography>
    </div>
  );
};

export default WelcomePage;
