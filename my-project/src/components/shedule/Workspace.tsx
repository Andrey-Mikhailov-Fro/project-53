import StateShedule from "./workspaces/state_shedule/StateShedule";

function Workspace() {
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
        {tabs.map((tab) => (
          <button key={tab} className="workspace-tab" >{tab}</button>
        ))}
      </div>
      <StateShedule />
    </div>
  );
}

export default Workspace;
