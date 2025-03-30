import { useState } from "react";
import StateShedule from "./state_shedule/StateShedule";
import "./Workspace.scss";

function Workspace() {
  const [active, setActive] = useState(2);

  const tabs = [
    "Карточка организации",
    "Обособленные подразделения",
    "Штатное расписание",
    "Исполнительный орган по ВККиБМД",
    "Мониторинг",
  ];

  return (
    <div className="workspace">
      <div className="workspace-tabs">
        {tabs.map((tab, index) => (
          <button key={tab} className={ active === index ? "workspace-tab active-tab" : "workspace-tab"} onClick={() => setActive(index)}>
            {tab}
          </button>
        ))}
      </div>
      <StateShedule />
    </div>
  );
}

export default Workspace;
