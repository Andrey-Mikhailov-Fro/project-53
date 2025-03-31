import { observer } from "mobx-react-lite";
import profileStore from "../../stores/ProfileStore";
import rolesStore from "../../stores/RolesStore";
import { useState } from "react";

type NavBarProps = {
  variant: string;
};

function Navbar({ variant }: NavBarProps) {
  const [show, setShow] = useState(false);

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

  if (variants[variantKey].isLoading) return <div>Waiting...</div>;
  return (
    <div className="navigation">
      <div className="navigation-container">
        <span className="navigation-tag">{variants[variantKey].name}</span>
        <button
          className="navigation-dropdown"
          onClick={() => setShow(!show)}
        >
          <img
            className={show ? "opened" : ""}
            src="/dropdown.svg"
            alt="dropdown"
          />
        </button>
      </div>
      <nav className={show ? "open" : "close"}>
        {variants[variantKey].list.map((item) => {
          const { imageId, text } = item;
          const itemIcon = variants[variantKey].icons.find(
            (icon) => icon.id === imageId
          );

          return (
            <div
              key={text}
              className={
                show ? "navigation-node open" : "navigation-node close"
              }
            >
              <img
                className={show ? "" : "close"}
                src={itemIcon?.icon}
                alt=""
              />
              <a
                href=""
                className={
                  show
                    ? "navigation-node-text open"
                    : "navigation-node-text close"
                }
              >
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
