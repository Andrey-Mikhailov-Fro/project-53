import { useEffect } from "react";
import employeeStore from "../../stores/EmployeeStore";
import rolesStore from "../../stores/RolesStore";
import Header from "./Header";
import "./Main.scss";
import Workspace from "./Workspace";
import { observer } from "mobx-react-lite";
import Profile from "./Profile";
import sheduleWorkspaceStore from "../../stores/SheduleWorkspaceStore";
import cardFieldsStore from "../../stores/CardFieldsStore";

function Main() {
  useEffect(() => {
    cardFieldsStore.getOptions();
    rolesStore.getRoles();
    employeeStore.getEmployees();
  }, []);

  const pageView = {
    default: <Workspace />,
    profileCreation: <Profile mode="create" />,
    profileEditing: <Profile mode="edit" />,
  };

  const currentMode = sheduleWorkspaceStore.mode as keyof typeof pageView;

  return (
    <div className="main">
      <Header />
      {pageView[currentMode]}
    </div>
  );
}

export default observer(Main);
