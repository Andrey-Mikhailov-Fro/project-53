import item1 from "./item1.svg";
import item2 from "./item2.svg";
import item3 from "./item3.svg";
import item4 from "./item4.svg";
import item5 from "./item5.svg";
import importantTag from "./importantTag.svg";

type NavBarProps = {
  variant: string
};

export default function Navbar({ variant } : NavBarProps) {
  const profileCases = [
    { imageId: 1, text: "Структура ВКК" },
    { imageId: 2, text: "Организация" },
    { imageId: 3, text: "Реестр документов ВКК" },
    { imageId: 4, text: "Календарь ВКК" },
    { imageId: 5, text: "Тарифы и оплата" },
  ];

  const profileIcons = [
    { id: 1, icon: item1 },
    { id: 2, icon: item2 },
    { id: 3, icon: item3 },
    { id: 4, icon: item4 },
    { id: 5, icon: item5 },
  ];

  const workspaceCases = [
    { imageId: 1, text: "Руководитель МО" },
    { imageId: 1, text: "Ответственное лицо" },
    { imageId: 1, text: "Уполномоченное лицо" },
    { imageId: 1, text: "Председатель ВК" },
    { imageId: 1, text: "Секретарь ВК" },
    { imageId: 1, text: "Член ВК" },
    { imageId: 1, text: "Администратор клиники" },
  ];

  const workspaceIcon = [{ id: 1, icon: importantTag }];

  const variants = {
    profile: {
      name: 'Личный кабинет',
      list: profileCases,
      icons: profileIcons,
    },
    workspace: {
      name: 'Рабочее пространство',
      list: workspaceCases,
      icons: workspaceIcon,
    },
  };

  const variantKey = variant as keyof typeof variants;

  return (
    <div className="navigation">
      <div className="navigation-container">
        <span className="navigation-tag">{variants[variantKey].name}</span>
        <button className="navigation-dropdown">
          <img src="/dropdown.svg" alt="dropdown" />
        </button>
      </div>
      <nav>
        {variants[variantKey].list.map((item) => {
          const { imageId, text } = item;
          const itemIcon = variants[variantKey].icons.find((icon) => icon.id === imageId);

          return (
            <div key={text} className="navigation-node">
              <img src={itemIcon?.icon} alt="" />
              <a href="" className="navigation-node-text">
                {text}
              </a>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
