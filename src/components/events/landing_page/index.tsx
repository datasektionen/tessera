import grapesjs, { Editor, EditorConfig, ProjectData } from "grapesjs";
import GjsEditor from "@grapesjs/react";
import ReactDOMServer from "react-dom/server";
import { Box, ThemeProvider } from "@mui/joy";
import "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { addHeroComponent } from "./blocks/hero-section";
import { addEventDescriptionComponent } from "./blocks/event-description-section";
import { addBuyTicketsButtonComponent } from "./blocks/buy_button";
import { addPredefinedLocationMapComponent } from "./blocks/custom_map";
import { _editorCustomHtml } from "./editor/_editor_custom_html";
import { _editorCustomCSS } from "./editor/_editor_custom_css";
import { useEventDetails } from "../../../hooks/event/use_event_details_hook";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { onLoad, onSave } from "./state/_editor_state";
import defaultHTML from "./default";
import { generateGjsEditorConfig } from "./config";
import LoadingOverlay from "../../Loading";
import 'grapesjs-component-countdown'
import "grapesjs-preset-webpage";
import "grapesjs-blocks-basic";
import "bootstrap/dist/css/bootstrap.min.css";
import 'grapesjs-component-code-editor'

const theme = createTheme({
    // Your theme goes here
});

function LandingPageEditor() {
    const { eventID } = useParams();
    const [loadingEditor, setLoadingEditor] = useState(true);

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

        var styleManager = editor.StyleManager
        styleManager.addProperty('Typography', {
            name: 'Alternate Fonts',
            property: 'font-family',
            type: 'select',
            defaults: '',
            list: [{
                id: 'arial',
                value: '',
                name: ''
            },
            {
                id: 'Josefin Sans',
                value: 'Josefin Sans, sans-serif',
                name: 'Josefin Sans'
            },
            {
                id: 'Roboto',
                value: 'Roboto, sans-serif',
                name: 'Roboto'
            },
            {
                id: 'Lato',
                value: 'Lato, sans-serif',
                name: 'Lato'
            }
            ]
        })


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
        <>

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
        </>
    );
}

export default LandingPageEditor;
