import { EditorConfig, ProjectData } from "grapesjs";
import ApiRoutes from "../../../routes/backend_routes";
import defaultHTML from "./default";

export const generateGjsEditorConfig = (eventID: string): EditorConfig => {
  const gjsOptions: EditorConfig = {
    container: "#gjs",
    height: "100vh",
    storageManager: {
      id: "gjs-", // Local Storage prefix, might not be needed in your case
      type: "remote", // Tell GrapesJS to expect custom load and store methods
      autosave: true, // If true, use `stepsBeforeSave` to control frequency
      autoload: true, // Automatically load the saved data when the editor initializes
      options: {
        remote: {
          headers: {
            "Content-Type": "application/json",
          },
          urlLoad: ApiRoutes.generateRoute(
            ApiRoutes.MANAGER_EVENT_LANDING_PAGE_EDITOR,
            {
              eventID,
            }
          ),
          urlStore: ApiRoutes.generateRoute(
            ApiRoutes.MANAGER_EVENT_LANDING_PAGE_EDITOR,
            {
              eventID,
            }
          ),

          credentials: "include", // or 'same-origin', 'omit' depending on CORS needs
          contentTypeJson: true,
          onStore: (data: ProjectData) => {
            // Assume the response from your API wraps the project data in a 'data' key
            return { data };
          },
          onLoad: (data: ProjectData) => {
            // Assume the project data is wrapped in a 'data' key
            return data.data;
          },

          fetchOptions: (opts) => {
            // Modify options based on conditions
            return opts.method === "POST" ? { ...opts, method: "PUT" } : opts;
          },
        },
      },
    },
    fromElement: true, // Load the HTML from the element
    canvas: {
      styles: [
        "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
        `${process.env.REACT_APP_BASE_URL}/test.css`,
        "https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@200;300;400;600;700&display=swap",
      ],
    },
    undoManager: { trackSelection: false },
    selectorManager: { componentFirst: true },
    styleManager: {
      // @ts-ignore
      sectors: [
        {
          name: "General", // Add the missing 'name' property
          open: true,
          buildProps: [
            "background-color",
            "padding",
            "margin",
            "color",
            "display",
            "justify-content",
            "align-items",
            "background-image",
          ],
          properties: [
            {
              property: "display",
              name: "Display",
              type: "select",
              defaults: "block",
              list: [
                { value: "block", name: "Block", id: "block" },
                { value: "flex", name: "Flex", id: "flex" },
              ],
            },
            {
              property: "justify-content",
              name: "Justify Content",
              type: "select",
              defaults: "flex-start",
              list: [
                { value: "flex-start", name: "Flex Start", id: "flex-start" },
                { value: "center", name: "Center", id: "center" },
                { value: "flex-end", name: "Flex End", id: "flex-end" },
                {
                  value: "space-between",
                  name: "Space Between",
                  id: "space-between",
                },
                {
                  value: "space-around",
                  name: "Space Around",
                  id: "space-around",
                },
                {
                  value: "space-evenly",
                  name: "Space Evenly",
                  id: "space-evenly",
                },
              ],
            },
            {
              property: "align-items",
              name: "Align Items",
              type: "select",
              defaults: "stretch",
              list: [
                { value: "stretch", name: "Stretch", id: "stretch" },
                { value: "flex-start", name: "Flex Start", id: "flex-start" },
                { value: "center", name: "Center", id: "center" },
                { value: "flex-end", name: "Flex End", id: "flex-end" },
                { value: "baseline", name: "Baseline", id: "baseline" },
              ],
            },
          ],
        },
        {
          name: "Typography", // Add the missing 'name' property
          open: false,
          buildProps: [
            "font-family",
            "font-size",
            "font-weight",
            "letter-spacing",
            "text-align",
            "color",
          ],
          properties: [
            {
              property: "font-family",
              name: "Font",
              list: [
                {
                  id: "arial",
                  name: "Arial, sans-serif",
                  value: "Arial, sans-serif",
                },
                {
                  id: "jos",
                  name: "Josefin Sans",
                  value: "Josefin Sans, sans-serif",
                },
              ],
            },
            // Other properties...
          ],
        },
        {
          name: "Decorations", // Add the missing 'name' property
          open: false,
          buildProps: [
            "border-radius-c",
            "background-color",
            "border-radius",
            "border",
          ],
        },
        {
          name: "Extra", // Add the missing 'name' property
          open: false,
          buildProps: ["transition", "perspective", "transform"],
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

  return gjsOptions;
};
