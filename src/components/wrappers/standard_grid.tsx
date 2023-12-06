import { Grid } from "@mui/joy";

interface StandardGridProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const StandardGrid: React.FC<StandardGridProps> = ({ children, style }) => {
  return (
    <Grid
      container
      spacing={2}
      columns={16}
      sx={{ flexGrow: 1 }}
      style={{
        ...style,
        marginLeft: "5%",
        marginRight: "5%",
      }}
    >
      {children}
    </Grid>
  );
};

export default StandardGrid;
