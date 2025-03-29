import { format } from "date-fns";
import CardFieldsStore, {
  FieldDataEmployee,
} from "../../stores/CardFieldsStore";
import EmployeeStore, { Employee } from "../../stores/EmployeeStore";
import SheduleWorkspaceStore from "../../stores/SheduleWorkspaceStore";
import "./Profile.scss";
import ProfileField from "./ProfileField";
import React from "react";

type ProfileProps = {
  mode: string;
};

function Profile({ mode }: ProfileProps) {
  if (mode === 'edit') {
    CardFieldsStore.setValues(EmployeeStore.activeEmployee as Employee);
  }

  const { fields } = CardFieldsStore;

  const reduceFormData = () => {
    const required: FieldDataEmployee = {
      name: "",
      position: "",
      medPosition: "",
      department: "",
      phone: "",
      email: "",
      hired: "",
    };
    CardFieldsStore.values.forEach((value) => {
      if (value.prop === "name") {
        required.name = (required.name + " " + value.value).trim();
        return;
      }

      if (value.prop === "hired") {
        const formattedDate = format(
          new Date(value.value as string),
          "dd.MM.yyyy"
        );
        required.hired = formattedDate;
        return;
      }
      required[value.prop] = value.value as string;
    });

    const defaultValues: Omit<Employee, keyof FieldDataEmployee> = {
      id:
        mode === "edit"
          ? (EmployeeStore.activeEmployee.id as number)
          : EmployeeStore.employees.length + 20,
      status: "Активен",
      roles: [],
      locked: false,
      sds: false,
      fired: null,
    };

    const newEmployee: Employee = { ...required, ...defaultValues };

    return newEmployee;
  };

  const variants = {
    create: {
      breadcrump: "Добавление нового сотрудника",
      title: "Основные данные сотрудника",
      baseFieldsDataSettings: () => CardFieldsStore.setDefault(),
      onSubmit: () => {
        const newEmployee = reduceFormData();
        EmployeeStore.addEmployee(newEmployee);
        SheduleWorkspaceStore.switchMode("default");
      },
    },
    edit: {
      breadcrump: "Редактирование карточки сотрудника",
      title: EmployeeStore.activeEmployee.name,
      baseFieldsDataSettings: () => CardFieldsStore.setValues(EmployeeStore.activeEmployee as Employee),
      onSubmit: () => {
        const updatedEmployee = reduceFormData();
        EmployeeStore.updateEmployee(
          EmployeeStore.activeEmployee.id as number,
          updatedEmployee
        );
        SheduleWorkspaceStore.switchMode('default');
      },
    },
  };

  const viewMode = mode as keyof typeof variants;

  variants[viewMode].baseFieldsDataSettings();

  return (
    <div className="profile">
      <button
        className="profile-exit"
        onClick={() => SheduleWorkspaceStore.switchMode("default")}
      >
        Персоналии
      </button>
      <span className="profile-current">/ {variants[viewMode].breadcrump}</span>
      <h2>{variants[viewMode].title}</h2>
      <form
        className="profile-table"
        onSubmit={(e) => {
          e.preventDefault();
          variants[viewMode].onSubmit();
        }}
      >
        {fields.map((field) => (
          <ProfileField
            key={field.id}
            variant={field.tag.variant}
            field={field}
          />
        ))}
        <button type="submit" className="profile-submit">
          Сохранить изменения
        </button>
      </form>
    </div>
  );
}

export default React.memo(Profile);
