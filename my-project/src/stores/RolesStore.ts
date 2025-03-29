import { makeAutoObservable, runInAction } from "mobx";
import importantTag from "./assets/importantTag.svg";
import ky from "ky";

type Role = {
  id: number;
  imageId: number;
  text: string;
};

type ResponseItem = {
  name: string;
  label: string;
};

type Response<T> = {
  message: string;
  data: {
    items: T[];
  };
};

const initialIcons = [{ id: 1, icon: importantTag }];

export class RolesStore {
  roles: Role[] = [];
  icons = initialIcons;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  getRoles = async () => {
    this.isLoading = true;
    const response: Response<ResponseItem> = await ky
      .get("https://api.mock.sb21.ru/api/v1/roles")
      .json();

    const loadedData = response.data.items;
    const normalizedData = loadedData.map((item, i) => {
      const normalizedItem = {
        id: i + 1,
        imageId: 1,
        text: item.label,
      };

      return normalizedItem;
    });

    runInAction(() => {
      this.roles = normalizedData;
      this.isLoading = false;
    });
  };
}

export default new RolesStore();
