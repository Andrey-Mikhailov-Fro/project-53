import { makeAutoObservable, runInAction } from "mobx";
import { Employee } from "./EmployeeStore";
import { format } from "date-fns";
import ky from "ky";

export type Field = {
  id: string;
  name: string;
  tag: {
    variant: string;
    type?: string;
    validationType?: string;
    options?: string[];
    prop: keyof FormData;
  };
  placeholder: string;
};

export type FormData = {
  surname: string;
  name: string;
  patronymic: string;
  administrative: string;
  medical: string;
  department: string;
  phone: string;
  email: string;
  date: Date;
};

export type Value = {
  fieldId: string;
  prop: keyof FieldDataEmployee;
  value: string | null;
};

type ResponseItem = {
  name: string;
  label: string;
};

type Response = {
  message: string;
  data: {
    items: ResponseItem[];
  };
};

export type FieldDataEmployee = Omit<
  Employee,
  "id" | "roles" | "status" | "sds" | "fired" | "locked"
>;

const initialFieldsData: Field[] = [
  {
    id: "surname-field",
    name: "Фамилия",
    tag: {
      variant: "input",
      type: "text",
      validationType: "surname",
      prop: "surname",
    },
    placeholder: "Введите Фамилию",
  },
  {
    id: "name-field",
    name: "Имя",
    tag: {
      variant: "input",
      type: "text",
      validationType: "name",
      prop: "name",
    },
    placeholder: "Введите Имя",
  },
  {
    id: "patronymic-field",
    name: "Отчество",
    tag: {
      variant: "input",
      type: "text",
      validationType: "patronymic",
      prop: "patronymic",
    },
    placeholder: "Введите Отчество",
  },
  {
    id: "administrative-field",
    name: "Административная должность",
    tag: {
      variant: "select",
      options: [],
      prop: "administrative",
    },
    placeholder: "Выберите должность",
  },
  {
    id: "medical-field",
    name: "Медицинская должность",
    tag: {
      variant: "select",
      options: [],
      prop: "medical",
    },
    placeholder: "Выберите должность",
  },
  {
    id: "department-field",
    name: "Подразделение",
    tag: {
      variant: "select",
      options: [],
      prop: "department",
    },
    placeholder: "Выберите подразделение",
  },
  {
    id: "phone-field",
    name: "Телефон",
    tag: {
      variant: "input",
      type: "text",
      validationType: "phone",
      prop: "phone",
    },
    placeholder: "+7 (***) ****-**-**",
  },
  {
    id: "email-field",
    name: "E-mail",
    tag: {
      variant: "input",
      type: "email",
      validationType: "email",
      prop: "email",
    },
    placeholder: "Введите ваш E-mail",
  },
  {
    id: "date-field",
    name: "Дата принятия на работу",
    tag: {
      variant: "input",
      type: "date",
      prop: "date",
    },
    placeholder: "Выберите дату",
  },
];

const initialValues: Value[] = [
  { fieldId: "surname-field", prop: "name", value: "" },
  { fieldId: "name-field", prop: "name", value: "" },
  { fieldId: "patronymic-field", prop: "name", value: "" },
  { fieldId: "administrative-field", prop: "position", value: "" },
  { fieldId: "medical-field", prop: "medPosition", value: "" },
  { fieldId: "department-field", prop: "department", value: "" },
  { fieldId: "phone-field", prop: "phone", value: "" },
  { fieldId: "email-field", prop: "email", value: "" },
  {
    fieldId: "date-field",
    prop: "hired",
    value: format(Date.now(), "yyyy-MM-dd"),
  },
];

class CardFieldsStore {
  fields = initialFieldsData;
  values: Value[] = initialValues;
  isLoading = false;
  isEnabled = false;

  constructor() {
    makeAutoObservable(this);
  }

  async getOptions() {
    this.isLoading = true;
    const departmentsResponse: Response = await ky
      .get("https://api.mock.sb21.ru/api/v1/departments")
      .json();

    const loadedDepartments = departmentsResponse.data.items;

    const administrativeResponse: Response = await ky
      .get("https://api.mock.sb21.ru/api/v1/positions")
      .json();

    const loadedAdministrative = administrativeResponse.data.items;

    const medicalResponse: Response = await ky
      .get("https://api.mock.sb21.ru/api/v1/roles")
      .json();

    const loadedMedical = medicalResponse.data.items;

    const administrative = this.fields.find(
      (item) => item.id === "administrative-field",
    ) as Field;
    const medical = this.fields.find(
      (item) => item.id === "medical-field",
    ) as Field;
    const department = this.fields.find(
      (item) => item.id === "department-field",
    ) as Field;

    runInAction(() => {
      administrative.tag.options = loadedAdministrative.map(
        (item) => item.label,
      );
      medical.tag.options = loadedMedical.map((item) => item.label);
      department.tag.options = loadedDepartments.map((item) => item.label);

      this.isLoading = false;
    });
  }

  setValues(employee: Employee) {
    const newValues = this.values.map((item) => {
      if (item.fieldId === "surname-field") {
        item.value = employee.name.split(" ")[0];
        return item;
      }

      if (item.fieldId === "name-field") {
        item.value = employee.name.split(" ")[1];
        return item;
      }

      if (item.fieldId === "patronymic-field") {
        item.value = employee.name.split(" ")[2];
        return item;
      }

      item.value = employee[item.prop];
      return item;
    });

    runInAction(() => {
      this.values = newValues;
      this.isEnabled = true;
    });
  }

  setDefault() {
    this.values = initialValues;
    this.isEnabled = false;
  }

  updateValue(id: string, value: string) {
    const currentValue = this.values.find(
      (item) => item.fieldId === id,
    ) as Value;

    runInAction(() => {
      currentValue.value = value;

      if (this.values.every((item) => item.value !== "")) {
        this.isEnabled = true;
      } else {
        this.isEnabled = false;
      }
    });
  }
}

export default new CardFieldsStore();
