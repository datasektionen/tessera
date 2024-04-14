import BorderBox from "../../wrappers/border_box";

export const OverviewBorderBoxWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <BorderBox
      style={{
        width: "fit-content",
        height: "100px",
        borderRadius: 2,
        borderWidth: 2,
        paddingLeft: 4,
        paddingRight: 4,
      }}
    >
      {children}
    </BorderBox>
  );
};
