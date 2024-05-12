import grapesjs, { Editor, EditorConfig, ProjectData } from "grapesjs";
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
import { useParams } from "react-router-dom";
import { useEventDetails } from "../../../../hooks/use_event_details_hook";
import { parse } from "path";
import MUITesseraWrapper from "../../../../components/wrappers/page_wrapper_mui";
import DrawerComponent from "../../../../components/navigation/manage_drawer";
import { useEffect } from "react";
import { addEventDescriptionComponent } from "./components/event-description-section";
import LoadingOverlay from "../../../../components/Loading";
import { _editorCustomHtml } from "./components/editor/_editor_custom_html";
import { _editorCustomCSS } from "./components/editor/_editor_custom_css";

const theme = createTheme({
  // Your theme goes here
});

const gjsOptions: EditorConfig = {
  height: "100vh",
  storageManager: {
    id: "gjs-", // Local Storage prefix
    type: "local",
    autosave: true, // Enable auto-saving
    autoload: true, // Enable auto-loading
    stepsBeforeSave: 1,
  },
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


function EditEventLandingPage() {
  const { eventID } = useParams();

  const {
    eventDetail: { event, loading },
  } = useEventDetails(parseInt(eventID!));

  const load = async (editor: Editor) => {
    const storageManager = editor.StorageManager;
    const data = await storageManager.load();
    editor.loadProjectData(data);
  };

  const save = async (editor: Editor) => {
    const storageManager = editor.StorageManager;
    const data = editor.store();
    await storageManager.store(data);
  };

  const onEditor = (editor: Editor) => {
    // Inject external CSS into the iframe of the GrapesJS editor
    addHeroComponent(editor);
    addEventDescriptionComponent(editor, event!);

    setTimeout(() => {
      editor.load();
    }, 50);

    editor.on('storage:store', () => {
      console.log('Autosave triggered');
    });

    _editorCustomHtml(editor);
    _editorCustomCSS(editor);

    editor.Panels.addButton("options", {
      id: "save-btn",
      className: "fa fa-save",
      command: "save-command",
      attributes: { title: "Save" },
    });

    // Define the command to save
    editor.Commands.add("save-command", {
      run: function (editor) {
        console.log("Saving...");
        save(editor); // Manually trigger a save
      },
    });

    // Add a load button in the panel
    editor.Panels.addButton("options", {
      id: "load-btn",
      className: "fa fa-upload",
      command: "load-command",
      attributes: { title: "Load" },
    });

    // Define the command to load
    editor.Commands.add("load-command", {
      run: function (editor) {
        editor.load(); // Manually trigger a load
      },
    });

    editor.Panels.addButton("options", {
      id: "reset-btn",
      className: "fa fa-refresh",
      command: "reset-command",
      attributes: { title: "Reset" },
    });

    // Define the command to reset
    editor.Commands.add("reset-command", {
      run: function (editor) {
        editor.setComponents(defaultHTML);
      },
    });

    // Listen to storage-related events
    editor.on("editor:start", () => {
      console.log("Storage start store");
    });

    editor.on("storage:load", (data) => console.log("Loaded data:", data));
  };

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <GjsEditor
      style={{
        margin: 0,
        padding: 0,
      }}
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

export default EditEventLandingPage;
