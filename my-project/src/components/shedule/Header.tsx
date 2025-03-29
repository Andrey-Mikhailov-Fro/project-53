import Chip from "./Chip";

export default function Header() {
  return (
    <div className="department">
      <select className="department-select" value="default">
        <option className="department-select-option" value="default">
          Выберите подразделение
        </option>
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
