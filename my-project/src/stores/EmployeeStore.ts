import { makeAutoObservable, runInAction } from "mobx";
import ky from "ky";
import { format, fromUnixTime } from "date-fns";
import { ru } from "date-fns/locale";

export type Employee = {
  id: number;
  name: string;
  phone: string;
  email: string;
  position: string;
  department: string | null;
  medPosition: string | null;
  roles: string[];
  status: string;
  hired: string;
  fired: string | null;
  sds: boolean;
  locked: boolean;
};

type Filters = {
  name: number[];
  role: number[];
};

type ResponseItem = {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  administrative_position: {
    label: string;
    type: string;
    value: string;
  };
  department: {
    value: string;
    label: string;
  };
  medical_position: null | {
    label: string;
    type: string;
    value: string;
  };
  created_at: number;
  hired_at: number;
  fired_at: number | null;
  updated_at: number;
  email: string;
  email_verified: number;
  phone: string;
  status: {
    value: string;
    label: string;
  };
  roles: string[];
  is_simple_digital_sign_enabled: boolean;
};

type Response = {
  message: string;
  data: {
    items: ResponseItem[];
  };
};

class EmployeeStore {
  employees: Employee[] = [];
  activeEmployee: Partial<Employee> = {};
  isLoading = false;
  filters: Filters = {
    name: [],
    role: [],
  };
  additionalFilters = {
    locked: false,
    fired: false,
  };

  constructor() {
    makeAutoObservable(this);
    this.loadFilters();
  }

  getEmployees = async () => {
    this.isLoading = true;
    const response: Response = await ky
      .get("https://api.mock.sb21.ru/api/v1/users")
      .json();

    const loadedData = response.data.items;

    const formatDate = (dateString: number | null) => {
      if (!dateString) return "-";
      try {
        return format(fromUnixTime(dateString), "dd.MM.yyyy", { locale: ru });
      } catch {
        console.log("error");
        return dateString.toString();
      }
    };

    const normalizedData = loadedData.map((item) => {
      const normalizedItem: Employee = {
        id: item.id,
        name: item.name + " " + item.surname + " " + item.patronymic,
        phone: "+" + item.phone,
        email: item.email,
        position: item.administrative_position?.label ?? null,
        department: item.department?.label ?? null,
        medPosition: item.medical_position?.label ?? null,
        roles: [...item.roles],
        status: item.status.label,
        hired: formatDate(item.hired_at),
        fired: formatDate(item.fired_at),
        sds: item.is_simple_digital_sign_enabled,
        locked: false,
      };

      return normalizedItem;
    });

    runInAction(() => {
      this.employees = [...normalizedData];
      this.isLoading = false;
    });
  };

  addEmployee = (employee: Employee) => {
    const newList = [...this.employees, employee];
    this.employees = newList;
  };

  setActiveEmployee = (id: number) => {
    this.activeEmployee = this.employees.find(
      (employee) => employee.id === id
    ) as Employee;
  };

  deleteEmployeeCard = (id: number) => {
    this.employees = this.employees.filter((employee) => employee.id !== id);
  };

  updateEmployee = (id: number, update: Partial<Employee>) => {
    this.employees = this.employees.map((employee) =>
      employee.id === id ? { ...employee, ...update } : employee
    );
  };

  blockEmployee = (id: number) => {
    this.updateEmployee(id, { locked: true });
  };

  unblockEmployee = (id: number) => {
    this.updateEmployee(id, { locked: false });
  };

  fireEmployee = (id: number) => {
    this.updateEmployee(id, {
      fired: format(Date.now(), "dd.MM.yyyy"),
      status: "Уволен",
    });
  };

  addFilter = (key: keyof Filters, ids: number[]) => {
    runInAction(() => {
      this.filters[key] = [...ids];
      this.saveFilters();
    });
  };

  private saveFilters = () => {
    localStorage.setItem("filters", JSON.stringify(this.filters));
  };

  private loadFilters = () => {
    const saved = localStorage.getItem("filters");
    if (saved) {
      this.filters = JSON.parse(saved);
    }
  };

  switchAdditionalFilter = (key: keyof typeof this.additionalFilters) => {
    this.additionalFilters[key] = !this.additionalFilters[key];
  };

  getFilteredEmployeesList = () => {
    const isNoNameFilters = this.filters.name.length === 0;
    const isNoRoleFilters = this.filters.role.length === 0;
    let filteredList = [...this.employees];

    if (!isNoNameFilters) {
      filteredList = filteredList.filter((employee) =>
        this.filters.name.includes(employee.id)
      );
    }

    if (!isNoRoleFilters) {
      filteredList = filteredList.filter((employee) =>
        this.filters.role.includes(employee.id)
      );
    }

    if (this.additionalFilters.locked) {
      filteredList = filteredList.filter((employee) => employee.locked);
    }

    if (this.additionalFilters.fired) {
      filteredList = filteredList.filter((employee) => employee.fired !== null);
    }

    return filteredList;
  };
}

export default new EmployeeStore();
