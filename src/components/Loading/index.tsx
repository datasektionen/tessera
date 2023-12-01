import { CircularProgress, Box } from "@mui/joy";

const LoadingOverlay = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        zIndex: 9999,
        backdropFilter: "blur(2px)",
      }}
    >
      <CircularProgress color="success" size={"lg"} variant="plain" />
    </Box>
  );
};

export default LoadingOverlay;
