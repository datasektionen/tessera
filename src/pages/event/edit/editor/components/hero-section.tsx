import { Editor } from "grapesjs";

export const addHeroComponent = (editor: Editor) => {
  editor.DomComponents.addType("hero-section", {
    isComponent: (el) =>
      el.tagName === "SECTION" && el.classList.contains("hero-section"),
    model: {
      defaults: {
        tagName: "section",
        classes: ["hero-section"],
        traits: [
          {
            type: "select",
            label: "Background Type",
            name: "background-type",
            options: [{ id: "image", value: "image", name: "Image" }],
            changeProp: true,
          },
          {
            type: "text",
            label: "URL",
            name: "url",
            changeProp: true,
          },
        ],
        components: [
          {
            tagName: "div",
            type: "text",
            classes: ["overlay"],
            components: [
              {
                type: "text",
                tagName: "h1",
                content: "Welcome to The Annual Tech Conference",
                attributes: {
                  style: "color: white; font-size: 48px; font-weight: bold;",
                },
              },
              {
                type: "text",
                tagName: "p",
                content:
                  "Join us for a day of innovation and inspiration at TechCon 2024",
                attributes: {
                  style: "color: white; font-size: 24px; margin-top: 20px;",
                },
              },
              {
                type: "button",
                tagName: "button",
                classes: ["btn", "btn-primary", "btn-lg"],
                content: "Buy Tickets Now!",
                attributes: {
                  style: "margin-top: 30px;",
                  "data-toggle": "modal",
                  "data-target": "#heroModal",
                },
              },
            ],
            attributes: {
              style:
                "width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; background-color: rgba(0, 0, 0, 0.5);",
            },
          },
        ],
        style: {
          height: "100vh",
          width: "100%",
          "background-image": `{[ url ]}`,
          "background-size": "cover",
          "background-position": "center",
        },
        script: function () {
          const url = "{[ url ]}";
          this.style.backgroundImage = `url('${url}')`;
        },
      },
    },
  });

  editor.DomComponents.addType("text-container", {
    model: {
      defaults: {
        tagName: "div",
        classes: ["text-container"],
        components: [
          {
            type: "text", // Standard text component
            content: "Sample text 1",
          },
          {
            type: "text",
            content: "Sample text 2",
          },
        ],
        stylable: ["background-color", "padding", "margin"], // Enable styling from the style manager
        style: {
          "background-color": "#ffffff",
          padding: "20px",
          margin: "10px 0",
          color: "#000000",
        },
      },
    },
  });

  editor.BlockManager.add("text-container-block", {
    label: "Text Container",
    attributes: { class: "gjs-fonts gjs-f-text" },
    content: {
      type: "text-container",
    },
  });

  // Add a block for easy dragging and dropping of the hero section
  editor.BlockManager.add("hero-section-block", {
    label: "Hero Section",
    attributes: { class: "gjs-fonts gjs-f-hero" },
    content: {
      type: "hero-section",
      "background-type": "image",
      url: "https://picsum.photos/id/237/200/300",
    },
  });
};
