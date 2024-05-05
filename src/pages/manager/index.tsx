import DrawerBoxWrapper from "../../components/wrappers/manager_wrapper";
import MUITesseraWrapper from "../../components/wrappers/page_wrapper_mui";

const ManagerPage: React.FC = () => {
  return <MUITesseraWrapper>
    <DrawerBoxWrapper showManagerDashboard={true} />
  </MUITesseraWrapper>;
};

export default ManagerPage;
