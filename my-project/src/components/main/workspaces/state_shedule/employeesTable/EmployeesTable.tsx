import employeeStore, { Employee } from "../../../../../stores/EmployeeStore";
import "./EmployeesTable.scss";
import { observer } from "mobx-react-lite";
import Chip from "../../../Chip";
import edit from "./edit.svg";
import unlocked from "./unlocked.svg";
import locked from "./locked.svg";
import deleteEmployee from "./delete.svg";
import { useMemo, useState } from "react";
import Modal from "../modals/Modal";
import SheduleWorkspaceStore from "../../../../../stores/SheduleWorkspaceStore";
import RolesStore from "../../../../../stores/RolesStore";

type SortConfig = {
  key: keyof Employee;
  direction: "asc" | "desc";
};

function EmployeeGridTable() {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "name",
    direction: "asc",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [variant, setVariant] = useState("");
  const [active, setActive] = useState(0);

  const employees = employeeStore.getFilteredEmployeesList();

  const handleShow = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  const handleDetermineRole = (position: string) => {
    const currentRole = RolesStore.roles.find((role) => role.text === position)
      ?.id as number;
    return currentRole;
  };
  const handleControlClick = (buttonVariant: string, id: number) => {
    setVariant(buttonVariant);
    setActive(id);
    handleShow();
  };
  const requestSort = (key: keyof Employee) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedEmployees = useMemo(() => {
    const sortableItems = [...employees] as Employee[];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (
          typeof a[sortConfig.key] === "string" &&
          typeof b[sortConfig.key] === "string"
        ) {
          return sortConfig.direction === "asc"
            ? String(a[sortConfig.key]).localeCompare(String(b[sortConfig.key]))
            : String(b[sortConfig.key]).localeCompare(
                String(a[sortConfig.key])
              );
        }

        if (sortConfig.key === "hired" || sortConfig.key === "fired") {
          const dateA = new Date(a[sortConfig.key] as string).getTime();
          const dateB = new Date(b[sortConfig.key] as string).getTime();
          return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
        }

        if ((a[sortConfig.key] as number) < (b[sortConfig.key] as number)) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if ((a[sortConfig.key] as number) < (b[sortConfig.key] as number)) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [employees, sortConfig]);

  if (employeeStore.isLoading || RolesStore.isLoading)
    return <div>Waiting...</div>;
  return (
    <>
      <div className="grid-table">
        <div className="grid-header">
          <div className="grid-header-start"></div>
          <div className="sortable-header" onClick={() => requestSort("name")}>
            ФИО
            {sortConfig.key === "name" && (
              <span>{sortConfig.direction === "asc" ? " ↑" : " ↓"}</span>
            )}
          </div>
          <div className="sortable-header" onClick={() => requestSort("phone")}>
            Телефон
            {sortConfig.key === "phone" && (
              <span>{sortConfig.direction === "asc" ? " ↑" : " ↓"}</span>
            )}
          </div>
          <div className="sortable-header" onClick={() => requestSort("email")}>
            Email
            {sortConfig.key === "email" && (
              <span>{sortConfig.direction === "asc" ? " ↑" : " ↓"}</span>
            )}
          </div>
          <div>Пароль</div>
          <div
            className="sortable-header"
            onClick={() => requestSort("position")}
          >
            Должность
            {sortConfig.key === "position" && (
              <span>{sortConfig.direction === "asc" ? " ↑" : " ↓"}</span>
            )}
          </div>
          <div
            className="sortable-header"
            onClick={() => requestSort("medPosition")}
          >
            Роль
            {sortConfig.key === "medPosition" && (
              <span>{sortConfig.direction === "asc" ? " ↑" : " ↓"}</span>
            )}
          </div>
          <div
            className="sortable-header"
            onClick={() => requestSort("status")}
          >
            Статус УЗ
            {sortConfig.key === "status" && (
              <span>{sortConfig.direction === "asc" ? " ↑" : " ↓"}</span>
            )}
          </div>
          <div className="sortable-header" onClick={() => requestSort("sds")}>
            ПЭП
            {sortConfig.key === "sds" && (
              <span>{sortConfig.direction === "asc" ? " ↑" : " ↓"}</span>
            )}
          </div>
          <div className="sortable-header" onClick={() => requestSort("hired")}>
            Дата приема
            {sortConfig.key === "hired" && (
              <span>{sortConfig.direction === "asc" ? " ↑" : " ↓"}</span>
            )}
          </div>
          <div className="sortable-header" onClick={() => requestSort("fired")}>
            Дата увольнения
            {sortConfig.key === "fired" && (
              <span>{sortConfig.direction === "asc" ? " ↑" : " ↓"}</span>
            )}
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div className="grid-header-end"></div>
        </div>

        {sortedEmployees.map((employee) => (
          <div className="grid-row" key={employee.id}>
            <div className="grid-row-start no-text-cell">
              <input type="checkbox" />
            </div>
            <div data-tooltip-id="tooltip" data-tooltip-content="Имя сотрудника">
              {employee.name}
            </div>
            <div data-tooltip-id="tooltip" data-tooltip-content="Номер телефона сотрудника">{employee.phone}</div>
            <div data-tooltip-id="tooltip" data-tooltip-content="Электронная почта сотрудника">{employee.email}</div>
            <div>••••••••</div>
            <div data-tooltip-id="tooltip" data-tooltip-content="Должность в организации">{employee.position}</div>
            <div data-tooltip-id="tooltip" data-tooltip-content="Роль в организации">
              <Chip
                roleId={handleDetermineRole(employee.medPosition as string)}
              />
            </div>
            <div data-tooltip-id="tooltip" data-tooltip-content={employee.status}>{employee.status}</div>
            <div className="no-text-cell" data-tooltip-id="tooltip" data-tooltip-content={`Простая электронная подпись:${employee.sds ? 'Есть' : 'Нет'}`}>
              <input type="checkbox" checked={employee.sds} disabled />
            </div>
            <div data-tooltip-id="tooltip" data-tooltip-content="Дата приема на работу">{employee.hired}</div>
            <div data-tooltip-id="tooltip" data-tooltip-content="Дата увольнения с должности">{employee.fired}</div>
            <div className="no-text-cell" data-tooltip-id="tooltip" data-tooltip-content="Уволить сотрудника">
              <button
                className="fire-employee-button"
                onClick={() => handleControlClick("fire", employee.id)}
                disabled={employee.fired !== null}
              >
                Уволить
              </button>
            </div>
            <div className="no-text-cell" data-tooltip-id="tooltip" data-tooltip-content="Редактировать профиль сотрудника">
              <button
                onClick={() => {
                  employeeStore.setActiveEmployee(employee.id);
                  SheduleWorkspaceStore.switchMode("profileEditing");
                }}
              >
                <img src={edit} />
              </button>
            </div>
            <div className="no-text-cell" data-tooltip-id="tooltip" data-tooltip-content="Заблокировать профиль сотрудника">
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
            <div className="no-text-cell" data-tooltip-id="tooltip" data-tooltip-content="Удалить профиль сотрудника">
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
