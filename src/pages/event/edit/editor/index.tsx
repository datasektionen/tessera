import grapesjs, { Editor, EditorConfig } from "grapesjs";
import GjsEditor from "@grapesjs/react";
import ReactDOMServer from "react-dom/server";
import { Box, ThemeProvider } from "@mui/joy";
import "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import defaultHTML from "./default";
import defaultCSS from "./default-css";
import "grapesjs-preset-webpage";
import "grapesjs-blocks-basic";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { addHeroComponent } from "./components/hero-section";

const theme = createTheme({
  // Your theme goes here
});

const gjsOptions: EditorConfig = {
  height: "100vh",
  storageManager: false, // Disable the storage manager
  fromElement: true, // Load the HTML from the element
  canvas: {
    styles: [
      "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
      "http://localhost:5000/test.css",
    ],
  },
  undoManager: { trackSelection: false },
  selectorManager: { componentFirst: true },
  styleManager: {
    sectors: [
      {
        name: "General",
        open: true,
        buildProps: ["background-color", "padding", "margin", "color"],
      },
    ],
  },
  projectData: {
    assets: [],
    pages: [
      {
        name: "Home page",
        component: defaultHTML,
      },
    ],
  },
  pluginsOpts: {
    "grapesjs-tui-image-editor": {
      config: {
        includeUI: {
          initMenu: "filter",
        },
      },
    },
  },
};

export default function DefaultEditor() {
  const onEditor = (editor: Editor) => {
    // Inject external CSS into the iframe of the GrapesJS editor
    addHeroComponent(editor);
  };

  return (
    <GjsEditor
      // Pass the core GrapesJS library to the wrapper (required).
      // You can also pass the CDN url (eg. "https://unpkg.com/grapesjs")
      grapesjs="https://unpkg.com/grapesjs"
      // Load the GrapesJS CSS file asynchronously from URL.
      // This is an optional prop, you can always import the CSS directly in your JS if you wish.
      grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
      // GrapesJS init options
      options={gjsOptions}
      plugins={[
        {
          id: "gjs-blocks-basic",
          src: "https://unpkg.com/grapesjs-blocks-basic",
        },
        {
          id: "grapesjs-preset-webpage",
          src: "https://unpkg.com/grapesjs-preset-webpage",
        },
        {
          id: "grapesjs-plugin-forms",
          src: "https://unpkg.com/grapesjs-plugin-forms",
        },
        {
          id: "grapesjs-component-countdown",
          src: "https://unpkg.com/grapesjs-plugin-export",
        },
        {
          id: "grapesjs-touch",
          src: "https://unpkg.com/grapesjs-touch",
        },
        {
          id: "grapesjs-fonts",
          src: "https://unpkg.com/grapesjs-fonts",
        },
        {
          id: "grapesjs-symbols",
          src: "https://unpkg.com/grapesjs-symbols",
        },
        {
          id: "grapesjs-tui-image-editor",
          src: "https://unpkg.com/grapesjs-tui-image-editor",
        },
      ]}
      onEditor={onEditor}
    />
  );
}
