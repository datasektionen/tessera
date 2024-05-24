import { Editor } from "grapesjs";

export const addBuyTicketsButtonComponent = (editor: Editor) => {
    editor.DomComponents.addType("buy-tickets-button", {
        isComponent: (el) =>
            el.tagName === "BUTTON" && el.id === "buy-tickets",
        model: {
            defaults: {
                type: "button",
                id: "buy-tickets",
                tagName: "button",
                classes: ["btn", "btn-primary", "btn-lg"],
                content: "Buy Tickets Now!",
                style: {
                    // Add any default styles here
                },
            },
        },
    });
    editor.BlockManager.add("buy-tickets-button-block", {
        label: "Buy Tickets Button",
        attributes: { class: "fa fa-button" },
        content: {
            type: "buy-tickets-button",
        },
    });
};