import { observer } from "mobx-react-lite";
import Filter from "./filter/Filter";
import "./StateShedule.scss";
import AdditionalFilters from "./additional_filter/AdditionalFilters";
import EmployeeGridTable from "./employeesTable/EmployeesTable";
import sheduleWorkspaceStore from "../../../../stores/SheduleWorkspaceStore";

function StateShedule() {
  const handleSwitchToCreationMode = () => {
    sheduleWorkspaceStore.switchMode("profileCreation");
  };

  return (
    <>
      <div className="shedule-header">
        <h2 className="shedule-name">Штатное расписание</h2>
        <button
          className="add-employee"
          onClick={() => handleSwitchToCreationMode()}
        >
          Добавить сотрудника
        </button>
      </div>
      <div className="filters">
        <Filter type="name" />
        <Filter type="role" />
      </div>
      <AdditionalFilters />
      <EmployeeGridTable />
    </>
  );
}

export default observer(StateShedule);
