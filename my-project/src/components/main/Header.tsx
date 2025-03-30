import Chip from "./Chip";
import CardFieldsStore from "../../stores/CardFieldsStore";
import { useState } from "react";
import { observer } from "mobx-react-lite";

function Header() {
  const [value, setValue] = useState('');

  const departments = CardFieldsStore.fields.find(
    (item) => item.id === "department-field"
  )?.tag.options as string[];

  if (CardFieldsStore.isLoading) return (<div>Waiting...</div>);
  return (
    <div className="department">
      <select className="department-select" value={value} onChange={(e) => setValue(e.target.value)}>
        <option className="department-select-option" value=""disabled hidden>
          Выберите подразделение
        </option>
        {departments.map((department, index) => (
          <option key={department} value={index + 1}>{department}</option>
        ))}
      </select>
      <div className="department-actions">
        <div className="department-actions-left">
          <button>
            <img src="/bell.svg" alt="notes" />
          </button>
          <button>
            <img src="/letter.svg" alt="messages" />
          </button>
        </div>
        <div className="department-actions-right">
          <Chip roleId={1} />
          <button>
            <img src="/person.svg" alt="personal profile" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default observer(Header);