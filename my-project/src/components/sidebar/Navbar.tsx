import { observer } from "mobx-react-lite";
import profileStore from "../../stores/ProfileStore";
import rolesStore from "../../stores/RolesStore";

type NavBarProps = {
  variant: string;
};

function Navbar({ variant }: NavBarProps) {
  const variants = {
    profile: {
      name: "Личный кабинет",
      list: profileStore.options,
      icons: profileStore.icons,
      isLoading: false,
    },
    workspace: {
      name: "Рабочее пространство",
      list: rolesStore.roles,
      icons: rolesStore.icons,
      isLoading: rolesStore.isLoading,
    },
  };

  const variantKey = variant as keyof typeof variants;

  if (variants[variantKey].isLoading) return (<div>Waiting...</div>);
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
          const itemIcon = variants[variantKey].icons.find(
            (icon) => icon.id === imageId
          );

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

export default observer(Navbar);