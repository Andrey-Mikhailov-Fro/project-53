import employeeStore from "../../../../../stores/EmployeeStore";
import "./EmployeesTable.scss";
import { observer } from "mobx-react-lite";
import Chip from "../../../Chip";
import edit from "./edit.svg";
import unlocked from "./unlocked.svg";
import locked from "./locked.svg";
import deleteEmployee from "./delete.svg";
import { useState } from "react";
import Modal from "../modals/Modal";
import SheduleWorkspaceStore from "../../../../../stores/SheduleWorkspaceStore";
import RolesStore from "../../../../../stores/RolesStore";

function EmployeeGridTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [variant, setVariant] = useState("");
  const [active, setActive] = useState(0);

  const employees = employeeStore.getFilteredEmployeesList();

  const handleShow = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  const handleControlClick = (buttonVariant: string, id: number) => {
    setVariant(buttonVariant);
    setActive(id);
    handleShow();
  };

  if (employeeStore.isLoading && RolesStore.isLoading) return <div>Waiting...</div>;
  return (
    <>
      <div className="grid-table">
        <div className="grid-header">
          <div className="grid-header-start"></div>
          <div>ФИО</div>
          <div>Телефон</div>
          <div>Email</div>
          <div>Пароль</div>
          <div>Должность</div>
          <div>Роль</div>
          <div>Статус УЗ</div>
          <div>ПЭП</div>
          <div>Дата приема</div>
          <div>Дата увольнения</div>
          <div></div>
          <div></div>
          <div></div>
          <div className="grid-header-end"></div>
        </div>

        {employees.map((employee) => (
          <div className="grid-row" key={employee.id}>
            <div className="grid-row-start no-text-cell">
              <input type="checkbox" />
            </div>
            <div>{employee.name}</div>
            <div>{employee.phone}</div>
            <div>{employee.email}</div>
            <div>••••••••</div>
            <div>{employee.position}</div>
            <div>
              <Chip roleId={RolesStore.roles.find((role) => role.text === employee.medPosition)?.id as number ?? 2} />
            </div>
            <div>{employee.status}</div>
            <div className="no-text-cell">
              <input type="checkbox" checked={employee.sds} disabled />
            </div>
            <div>{employee.hired}</div>
            <div>{employee.fired}</div>
            <div className="no-text-cell">
              <button
                className="fire-employee-button"
                onClick={() => handleControlClick("fire", employee.id)}
                disabled={employee.fired !== null}
              >
                Уволить
              </button>
            </div>
            <div className="no-text-cell">
              <button onClick={() => {
                employeeStore.setActiveEmployee(employee.id);
                SheduleWorkspaceStore.switchMode('profileEditing');
              }}>
                <img src={edit} />
              </button>
            </div>
            <div className="no-text-cell">
              <button
                onClick={() =>
                  employee.locked
                    ? employeeStore.unblockEmployee(employee.id)
                    : handleControlClick("lock", employee.id)
                }
              >
                <img src={employee.locked ? locked : unlocked} />
              </button>
            </div>
            <div className="no-text-cell">
              <button onClick={() => handleControlClick("delete", employee.id)}>
                <img src={deleteEmployee} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        active={active}
        variant={variant}
        onClose={handleClose}
        isOpen={isModalOpen}
      />
    </>
  );
}

export default observer(EmployeeGridTable);
