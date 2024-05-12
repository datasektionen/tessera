import { EditorConfig, ProjectData } from "grapesjs";
import ApiRoutes from "../../../../routes/backend_routes";
import defaultHTML from "./default";


export const generateGjsEditorConfig = (eventID: string): EditorConfig => {
    const gjsOptions: EditorConfig = {
        container: "#gjs",
        height: "100vh",
        storageManager: {
            id: "gjs-", // Local Storage prefix, might not be needed in your case
            type: "remote", // Tell GrapesJS to expect custom load and store methods
            autosave: true,  // If true, use `stepsBeforeSave` to control frequency
            autoload: true,  // Automatically load the saved data when the editor initializes
            options: {
                remote: {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    urlLoad: ApiRoutes.generateRoute(ApiRoutes.MANAGER_EVENT_LANDING_PAGE_EDITOR, {
                        eventID,
                    }),
                    urlStore: ApiRoutes.generateRoute(ApiRoutes.MANAGER_EVENT_LANDING_PAGE_EDITOR, {
                        eventID,
                    }),

                    credentials: 'include', // or 'same-origin', 'omit' depending on CORS needs
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
                        return opts.method === 'POST' ? { ...opts, method: 'PUT' } : opts;
                    }
                }
            }
        },
        fromElement: true, // Load the HTML from the element
        canvas: {
            styles: [
                "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
                `${process.env.REACT_APP_BASE_URL}/test.css`
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

    return gjsOptions;
}