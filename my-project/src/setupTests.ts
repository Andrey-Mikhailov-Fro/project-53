import "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { configure } from "mobx";

configure({ enforceActions: "observed" });
