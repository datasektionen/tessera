import { Editor } from "grapesjs";

export const addHeroComponent = (editor: Editor) => {
  const parallaxScript = function (this: any) {
    const image = this.querySelector('img');
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      var offset = scrollPosition * 0.3;  // Adjust parallax speed here
      image.style.transform = 'translateY(' + offset + 'px)';
    });
  };

  editor.DomComponents.addType("hero-section", {
    isComponent: (el) =>
      el.tagName === "SECTION" && el.classList.contains("hero-section"),
    model: {
      defaults: {
        tagName: "section",
        classes: ["hero-section"],
        components: [
          {
            type: "image",
            src: `${process.env.REACT_APP_BASE_URL}/assets/default-landing-page-image.jpg`,
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
            },
          },
          {
            tagName: "div",
            classes: ["overlay"],
            components: [
              {
                type: "text",
                tagName: "h1",
                content: "Welcome to The Annual Tech Conference",
              },
              {
                type: "text",
                tagName: "p",
                content: "Join us for a day of innovation and inspiration at TechCon 2024",
              },
              {
                type: "button",
                id: "buy-tickets",
                tagName: "button",
                classes: ["btn", "btn-primary", "btn-lg"],
                content: "Buy Tickets Now!",
              },
            ],
            style: {
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        ],
        style: {
          position: "relative",
          height: "100vh",
          width: "100%",
          overflow: "hidden",
        },
        script: parallaxScript,  // Attach the script to the component
      },
    },
  });

  editor.BlockManager.add("hero-section-block", {
    label: "Hero Section",
    attributes: { class: "gjs-fonts gjs-f-hero" },
    content: {
      type: "hero-section",
    },
  });
};