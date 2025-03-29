import { makeAutoObservable } from "mobx";

class SheduleWorkspaceStore {
  mode = "default";

  constructor() {
    makeAutoObservable(this);
  }

  switchMode = (nextMode: string) => {
    this.mode = nextMode;
  };
}

export default new SheduleWorkspaceStore();
