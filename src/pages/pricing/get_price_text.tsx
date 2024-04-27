import StyledText from "../../components/text/styled_text";

export const getPriceText = (option: any, billingCycle: string) => {
  if (option.one_time) {
    return (
      <>
        {option.one_time.SEK + " SEK "}
        <StyledText
          sx={{ fontSize: "1rem" }}
          color="inherit"
          level="inherit"
          fontWeight={500}
        >
          per event
        </StyledText>
      </>
    );
  }

  if (option.title === "Network") {
    return "Custom";
  }

  if (option.price[billingCycle]?.SEK === 0) {
    return "Free";
  }

  return (
    <>
      {option.one_time !== undefined
        ? option.price.one_time?.SEK
        : option.price[billingCycle]?.SEK}
      {" SEK "}
      {!option.one_time && (
        <StyledText
          sx={{ fontSize: "1rem" }}
          color="inherit"
          level="inherit"
          fontWeight={500}
        >
          {billingCycle === "monthly"
            ? "per month"
            : "per month billed annually"}
        </StyledText>
      )}
    </>
  );
};
