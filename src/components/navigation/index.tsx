import React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import PALLETTE from "../../theme/pallette";
import { Grid, Stack } from "@mui/joy";

function NavigationBar() {
  return (
    <Box
      sx={{
        margin: 0,
        padding: 0,
        paddingBottom: 2,
        backgroundColor: PALLETTE.cerise,
        color: "white",
        width: "100vw",
      }}
    >
      {/* Left-aligned "tessera" text */}
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        sx={{
          padding: "16px",
          marginLeft: "16px",
          marginRight: "16px",
        }}
      >
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
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          style={{
            padding: 0,
          }}
        >
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
      </Grid>
    </Box>
  );
}

export default NavigationBar;
