import { observer } from "mobx-react-lite";
import rolesStore from "../../stores/RolesStore";

type ChipProps = {
  roleId: number;
};

function Chip({ roleId }: ChipProps) {
  const currentRole = rolesStore.roles.find((role) => role.id === roleId);

  const styleVariants = {
    1: {
      background: "#ffd5fb",
      textColor: "#9600ae",
    },
    2: {
      background: "#EEFFD3",
      textColor: "#7C9518",
    },
    3: {
      background: "#FFF8D3",
      textColor: "#A4861E",
    },
    4: {
      background: "#E5D5FF",
      textColor: "#5910D1",
    },
    5: {
      background: "#FFE0BB",
      textColor: "#A96E28",
    },
  };

  const variant = roleId as keyof typeof styleVariants;

  const { background, textColor } = styleVariants[variant];

  return (
    <span style={{ background: background, color: textColor }} className="chip">
      {currentRole?.text}
    </span>
  );
}

export default observer(Chip);
