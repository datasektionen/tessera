import { extendTheme } from "@mui/joy/styles";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        secondary: {
          50: "#fdf2f8",
          100: "#fce7f3",
          // ... other color shades
          500: "#ec4899",
          // ...
          900: "#831843",
          solidBg: "var(--joy-palette-secondary-400)",
          // ... other variant tokens
        },
      },
    },
  },
});

export default theme;
