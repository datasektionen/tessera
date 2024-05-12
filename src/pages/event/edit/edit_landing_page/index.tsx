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
import { addHeroComponent } from "./components/blocks/hero-section";
import { useParams } from "react-router-dom";
import { useEventDetails } from "../../../../hooks/event/use_event_details_hook";
import { parse } from "path";
import MUITesseraWrapper from "../../../../components/wrappers/page_wrapper_mui";
import React, { useEffect, useRef } from "react";
import { addEventDescriptionComponent } from "./components/blocks/event-description-section";
import LoadingOverlay from "../../../../components/Loading";
import { _editorCustomHtml } from "./components/editor/_editor_custom_html";
import { _editorCustomCSS } from "./components/editor/_editor_custom_css";
import { onLoad, onSave } from "./components/state/_editor_state";
import ApiRoutes from "../../../../routes/backend_routes";
import { addBuyTicketsButtonComponent } from "./components/blocks/buy_button";
import { generateGjsEditorConfig } from "./config";
import 'grapesjs-component-code-editor'
import { addPredefinedLocationMapComponent } from "./components/blocks/custom_map";


const theme = createTheme({
  // Your theme goes here
});

function EditEventLandingPage() {
  const { eventID } = useParams();
  const [loadingEditor, setLoadingEditor] = React.useState(true);

  const loadingEditorRef = useRef(loadingEditor);

  useEffect(() => {
    loadingEditorRef.current = loadingEditor;
  }, [loadingEditor]);

  const {
    eventDetail: { event, loading },
  } = useEventDetails(parseInt(eventID!));




  const onEditor = (editor: Editor) => {
    // Inject external CSS into the iframe of the GrapesJS editor
    addHeroComponent(editor);
    addEventDescriptionComponent(editor, event!);
    addBuyTicketsButtonComponent(editor);
    addPredefinedLocationMapComponent(editor, event?.location!);



    _editorCustomHtml(editor);
    _editorCustomCSS(editor);

    editor.on('component:remove', (component) => {
      if (loadingEditorRef.current) return;

      if (component.attributes.type === "buy-tickets-button" && !loadingEditorRef.current) {
        window.alert("You are removing the buy tickets button. This way users won't be able to buy tickets for your event.");
      }
    });

    editor.on("component:selected", (component) => {
      component.set("resizable", true);
    });

    editor.Panels.addButton("options", {
      id: "save-btn",
      className: "fa fa-save",
      command: "save-command",
      attributes: { title: "Save" },
    });


    // Define the command to save
    editor.Commands.add("save-command", {
      run: function (editor) {
        onSave(eventID!, editor);
        editor.store();
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
        editor.load();
        onLoad(eventID!, editor);
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



    // On initial load, load the content from the server
    editor.load();
    editor.on("load", () => {
      setLoadingEditor(false);
    });
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
      options={generateGjsEditorConfig(eventID!)}
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
        {
          id: "grapesjs-component-code-editor",
          src: "https://unpkg.com/grapesjs-component-code-editor",
        },
      ]}
      onEditor={onEditor}
    />
  );
}

export default EditEventLandingPage;
