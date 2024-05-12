const defaultCss = `
.overlay {
    pointer-events: none; /* Allows click events to pass through to the image below */
  }
  .overlay > * {
    pointer-events: auto; /* Ensures text and buttons within the overlay are still interactive */
  }

  event-location {
    border-radius: 20px;
    border-color: #000;
    border-width: 2px;
  }


    `;

export default defaultCss;
