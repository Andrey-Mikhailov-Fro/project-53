import React from "react";
import { beforeEach, describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "../src/components/main/workspaces/state_shedule/filter/Filter";

vi.mock(import("../src/stores/EmployeeStore"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
  }
});
vi.mock(import("../src/stores/RolesStore"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
  }
});

import employeeStore, { Employee } from "../src/stores/EmployeeStore";
import rolesStore from "../src/stores/RolesStore";

describe("Filter Component", () => {
  const mockEmployees: Employee[] = [
    {
      id: 1,
      name: "Иван Иванов",
      department: "",
      email: "",
      fired: "",
      hired: "",
      locked: false,
      medPosition: "",
      position: "",
      phone: "",
      roles: [],
      sds: false,
      status: "",
    },
    {
      id: 2,
      name: "Петр Иванов",
      department: "",
      email: "",
      fired: "",
      hired: "",
      locked: false,
      medPosition: "",
      position: "",
      phone: "",
      roles: [],
      sds: false,
      status: "",
    },
  ];

  const mockRoles = [
    { id: 1, imageId: 1, text: "Администратор" },
    { id: 2, imageId: 1, text: "Менеджер" },
  ];

  beforeEach(() => {

    vi.mocked(employeeStore).employees = mockEmployees;
    vi.mocked(employeeStore).filters = { name: [], role: [] };

    vi.mocked(rolesStore).roles = mockRoles;

    localStorage.clear();
  });

  it("renders correctly with default props", () => {
    render(React.createElement(Filter, { type: "name" }));

    expect(screen.getByText("Выберите сотрудника(ов)")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("shows and hides dropdown on button click", () => {
    render(React.createElement(Filter, { type: "name" }));

    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(screen.getByText("Иван Иванов")).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByText("Иван Иванов")).not.toBeInTheDocument();
  });

  it("selects and deselects options", () => {
    render(React.createElement(Filter, { type: "name" }));

    fireEvent.click(screen.getByRole("button"));

    const checkbox = screen.getByLabelText("Иван Иванов");
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(screen.getByText("Иван Иванов", { selector: 'span' })).toBeInTheDocument();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(screen.queryByText("Иван Иванов", { selector: 'span' })).not.toBeInTheDocument();
  });

  it("deletes selected chip", () => {
    localStorage.setItem("filters", JSON.stringify({ name: [1] }));

    render(React.createElement(Filter, { type: "name" }));

    const chip = screen.getByText("Иван Иванов");
    const deleteButton = chip.nextSibling;

    fireEvent.click(deleteButton!);

    expect(screen.queryByText("Иван Иванов")).not.toBeInTheDocument();
  });

  it("shows counter when more than 3 options selected", () => {
    localStorage.setItem("filters", JSON.stringify({ name: [1, 2, 3, 4] }));

    const additional: Employee[] = [
      {
        id: 3,
        name: "Сидор Сидоров",
        department: "",
        email: "",
        fired: "",
        hired: "",
        locked: false,
        medPosition: "",
        position: "",
        phone: "",
        roles: [],
        sds: false,
        status: "",
      },
      {
        id: 4,
        name: "Алексей Алексеев",
        department: "",
        email: "",
        fired: "",
        hired: "",
        locked: false,
        medPosition: "",
        position: "",
        phone: "",
        roles: [],
        sds: false,
        status: "",
      },
    ];

    employeeStore.employees = [...mockEmployees, ...additional];

    render(React.createElement(Filter, { type: "name" }));

    expect(screen.getByText("...")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("loads initial filters from localStorage", () => {
    localStorage.setItem("filters", JSON.stringify({ name: [1, 2] }));

    render(React.createElement(Filter, { type: "name" }));

    expect(screen.getByText("Иван Иванов")).toBeInTheDocument();
    expect(screen.getByText("Петр Иванов")).toBeInTheDocument();
  });

  it("renders role filter correctly", () => {
    render(React.createElement(Filter, { type: "role" }));

    expect(screen.getByText("Выберите роль(ли)")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Администратор")).toBeInTheDocument();
    expect(screen.getByText("Менеджер")).toBeInTheDocument();
  });
});
