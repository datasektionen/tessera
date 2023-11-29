// joy-ui.d.ts
import "@mui/joy/styles";

declare module "@mui/joy/styles" {
  interface Palette {
    secondary?: PaletteRange;
  }

  interface PaletteRange {
    50: string;
    100: string;
    500: string;
    900: string;
    solidBg?: string;
  }
}
