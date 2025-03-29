import { useState } from "react";
import employeeStore from "../../../../../stores/EmployeeStore";
import rolesStore from "../../../../../stores/RolesStore";
import FilterChip from "./FilterChip";
import { observer } from "mobx-react-lite";

type FilterProps = {
  type: string;
};

function Filter({ type }: FilterProps) {
  const [isShow, setIsShow] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);



  const handleShow = () => {
    setIsShow(!isShow);
  };

  const handleChange = (id: number) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const deleteFilter = (id: number) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== id));
  };

  const filterTypes = {
    name: {
      placeholder: 'Выберите сотрудника(ов)',
      list: employeeStore.employees.map((employee) => ({
        id: employee.id,
        label: employee.name,
      })),
    },
    role: {
      placeholder: 'Выберите роль(ли)',
      list: rolesStore.roles.map((role) => ({ id: role.id, label: role.text })),
    },
  };

  const typeKey = type as keyof typeof filterTypes;
  const filtersKey = type as keyof typeof employeeStore.filters;

  const optionsList = filterTypes[typeKey].list;
  employeeStore.addFilter(filtersKey, selectedOptions);

  return (
    <div className="filter">
      <div className="filter-input">
        {optionsList
          .filter((option) => selectedOptions.includes(option.id))
          .map((option) => (
            <FilterChip option={option} deleteChip={deleteFilter} />
          )) ?? <span>{filterTypes[typeKey].placeholder}</span>}
      </div>
      {selectedOptions.length >= 4 ? "..." : null}
      {selectedOptions.length >= 4 ? (
        <span className="filter-chip">{selectedOptions.length}</span>
      ) : null}
      <button onClick={() => handleShow()}>
        <img src="/dropdownDown.svg" />
      </button>
      {isShow && (
        <div className="filter-list">
          {optionsList.map((option) => (
            <label key={option.id} className="filter-option">
              <input
                type="checkbox"
                checked={selectedOptions.includes(option.id)}
                onChange={() => handleChange(option.id)}
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default observer(Filter);
