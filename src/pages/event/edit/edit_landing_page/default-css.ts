const defaultCss = `


.overlay {
    pointer-events: none; /* Allows click events to pass through to the image below */
  }
  .overlay > * {
    pointer-events: auto; /* Ensures text and buttons within the overlay are still interactive */
  }

    `;

export default defaultCss;
