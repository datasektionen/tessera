import { Editor } from "grapesjs";
import { marked } from "marked"; // Import marked
import { IEvent } from "../../../../types";

export const addEventDescriptionComponent = (editor: Editor, event: IEvent) => {

  const descriptionHTML = event?.description
    ? marked(event.description)
    : "This is a description of the event.";

  editor.DomComponents.addType("event-description-section", {
    isComponent: (el) =>
      el.tagName === "SECTION" &&
      el.classList.contains("event-description-section"),
    model: {
      defaults: {
        tagName: "section",
        classes: ["event-description-section"],
        components: [
          {
            tagName: "div",
            classes: ["description-container"],
            components: [
              {
                type: "text",
                tagName: "h1",
                content: "Description",
                attributes: {
                  style: "font-size: 24px; font-weight: bold; color: #333;",
                },
              },
              {
                type: "text",
                tagName: "p",
                content: descriptionHTML,
                attributes: {
                  style: "font-size: 16px; color: #666; margin-top: 10px;",
                },
              },
            ],
            style: {
              width: "75%",
              padding: "20px",
              backgroundColor: "#fff", // Adjusted for better visibility
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              margin: "50px auto", // Ensures margin on all sides if needed, centers horizontally
              textAlign: "center",
              alignSelf: "flex-start", // This only works if the parent is flex
            },
          },
        ],
        style: {
          position: "relative",
          height: "100vh",
          width: "100%",
          display: "flex", // Ensures the children can use flex properties
          alignItems: "flex-start", // Aligns children (containers) to the start of the flex container vertically
          justifyContent: "flex-start", // Aligns children to the start of the flex container horizontally
          backgroundColor: "#3f2", // A light background color for the whole section
        },
      },
    },
  });

  editor.BlockManager.add("event-description-block", {
    label: "Event Description",
    attributes: { class: "gjs-fonts gjs-f-hero" },
    content: {
      type: "event-description-section",
    },
  });
};
