import { Grid } from "@mui/joy";

interface StandardGridProps {
  children: React.ReactNode;
  spacing?: number;
  style?: React.CSSProperties;
  overrideStyle?: React.CSSProperties;
}

const StandardGrid: React.FC<StandardGridProps> = ({
  children,
  style,
  overrideStyle,
  spacing = 2,
}) => {
  return (
    <Grid
      container
      spacing={spacing}
      columns={16}
      sx={{ flexGrow: 1 }}
      style={{
        ...style,
        marginLeft: "5%",
        marginRight: "5%",
        ...overrideStyle,
      }}
    >
      {children}
    </Grid>
  );
};

export default StandardGrid;
