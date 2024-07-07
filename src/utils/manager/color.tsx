import PALLETTE from "../../theme/pallette";
import { INetwork } from "../../types";

export const getNetworkColors = (network?: INetwork | null) => {
  // Default values
  const defaults = {
    main_color: PALLETTE.cerise,
    accent_color: PALLETTE.cerise_dark,
    text_color: PALLETTE.charcoal,
  };

  // Determine main and accent colors based on network settings or use defaults
  const main_color = network?.settings?.main_color || defaults.main_color;
  const accent_color = network?.settings?.accent_color || defaults.accent_color;

  // Determine text color based on the main color's luminance
  const text_color = isColorDark(main_color)
    ? PALLETTE.white
    : PALLETTE.charcoal;

  return { main_color, accent_color, text_color };
};

/**
 * Determines if a color is dark based on its luminance.
 * @param color - The color to check, in hexadecimal format (with or without #).
 * @returns True if the color is dark, false otherwise.
 * @throws Error if the input is not a valid hex color.
 */
export function isColorDark(color: string): boolean {
  // Remove the hash if it exists
  const hex = color.replace(/^#/, "");

  // Check if it's a valid hex color
  if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
    throw new Error("Invalid hex color format");
  }

  // Parse the hex color
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // Calculate luminance using the same formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // A luminance of 0.5 is the midpoint, so we consider colors
  // with luminance < 0.5 as dark
  return luminance < 0.5;
}
