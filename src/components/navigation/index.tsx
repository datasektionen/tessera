import React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import PALLETTE from "../../theme/pallette";
import { Stack } from "@mui/joy";

function NavigationBar() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 16px",
        backgroundColor: PALLETTE.cerise,
        color: "white",
        width: "100vw",
      }}
    >
      {/* Left-aligned "tessera" text */}
      <Typography
        level="h4"
        component="a"
        href="/" // Link to the main page
        fontFamily={"Josefin sans"}
        fontSize={24}
        sx={{ textDecoration: "none", color: PALLETTE.offWhite }}
      >
        tessera
      </Typography>
      {/* Right-aligned profile icon */}
      <Stack direction="row" spacing={2} alignItems="center">
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
        <IconButton
          component="a"
          href="/logout" // Link to the logout page
        >
          <LogoutIcon
            style={{
              color: PALLETTE.offWhite,
            }}
          />
        </IconButton>
      </Stack>
    </Box>
  );
}

export default NavigationBar;
