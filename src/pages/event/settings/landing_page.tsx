import React, { useEffect, useState } from "react";
import {
  BuilderComponent,
  Builder,
  builder,
  useIsPreviewing,
} from "@builder.io/react";
import MUITesseraWrapper from "../../../components/wrappers/page_wrapper_mui";

builder.init("5030a048d8434d019a6b84573336816a");

const EventCard = ({ eventName, eventDate, description }: any) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        margin: "20px 0",
        borderRadius: "8px",
      }}
    >
      <h2>{eventName}</h2>
      <p>
        <strong>Date:</strong> {eventDate}
      </p>
      <p>{description}</p>
    </div>
  );
};

Builder.registerComponent(EventCard, {
  name: "EventCard",
  inputs: [
    {
      name: "eventName",
      type: "string",
      required: true,
      defaultValue: "Sample Event",
    },
    {
      name: "eventDate",
      type: "string",
      required: true,
      defaultValue: "2023-01-01",
    },
    {
      name: "description",
      type: "longText",
      defaultValue: "Describe your event here...",
    },
  ],
});

const LandingPage: React.FC = ({ match }: any) => {
  const [builderContentJson, setBuilderContentJson] = useState(null);

  useEffect(() => {
    builder
      // eslint-disable-next-line no-restricted-globals
      .get("tessera", { url: location.pathname })
      .promise()
      .then(setBuilderContentJson);
  }, []);

  return <BuilderComponent model="tessera" content={builderContentJson!} />;
};

export default LandingPage;
