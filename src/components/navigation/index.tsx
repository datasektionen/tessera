import React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import PALLETTE from "../../theme/pallette";

function NavigationBar() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 16px",
        backgroundColor: PALLETTE.cerise,
        color: "white",
      }}
    >
      {/* Left-aligned "tessera" text */}
      <Typography
        level="h4"
        component="a"
        href="/" // Link to the main page
        sx={{ textDecoration: "none", color: PALLETTE.offWhite }}
      >
        tessera
      </Typography>

      {/* Right-aligned profile icon */}
      <IconButton
        component="a"
        href="/profile" // Link to the profile page
      >
        <PersonIcon
          style={{
            color: PALLETTE.offWhite,
          }}
        />
      </IconButton>
    </Box>
  );
}

export default NavigationBar;
