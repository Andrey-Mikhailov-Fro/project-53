import React from "react";
import "./Modal.scss";
import { observer } from "mobx-react-lite";
import employeeStore from "../../../../../stores/EmployeeStore";

interface ModalProps {
  active: number;
  variant: string;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ active, variant, onClose, isOpen }) => {
  const content = {
    fire: {
      title: "Увольнение сотрудника",
      description:
        "Это действие будет невозможно отменить. Вы действительно хотите уволить сотрудника?\n Он навсегда потеряет доступ к своей учетной записи, если таковая была. Все созданные им документы и сделанные изменения в документах сохранятся. Также карточка данного сотрудника будет храниться в вашей базе данных.",
      actionText: "Уволить",
      action: employeeStore.fireEmployee,
    },
    lock: {
      title: "Блокировка сотрудника",
      description:
        "Это действие будет можно отменить. Вы действительно хотите заблокировать сотрудника?\n На время блокировки сотрудник потеряет доступ к своей учётной записи, если таковая существует. Все созданные им документы и сделанные изменения в документах сохранятся. Также карточка данного сотрудника будет храниться в вашей базе данных.",
      actionText: "Заблокировать",
      action: employeeStore.blockEmployee,
    },
    delete: {
      title: "Удаление карточки сотрудника",
      description:
        "Это действие будет невозможно отменить. Вы действительно хотите удалить карточку сотрудника?\n После этого сотрудник навсегда потеряет доступ к своей учетной записи, если таковая существует. Также карточка данного сотрудника будет безвозвратно удалена из вашей базы данных. Все созданные им документы и сделанные изменения в документах сохранятся.",
      actionText: "Удалить карточку",
      action: employeeStore.deleteEmployeeCard,
    },
  };

  const key = variant as keyof typeof content;

  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>{content[key].title}</h3>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <p>{content[key].description}</p>
        </div>
        <div className="modal-footer">
          <button
            className="secondary-button"
            onClick={() => {
              content[key].action(active);
              onClose();
            }}
          >
            {content[key].actionText}
          </button>
          <button className="primary-button" onClick={onClose}>
            Отменить
          </button>
        </div>
      </div>
    </div>
  );
};

export default observer(Modal);
