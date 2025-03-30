import { makeAutoObservable } from "mobx";
import item1 from "./assets/item1.svg";
import item2 from "./assets/item2.svg";
import item3 from "./assets/item3.svg";
import item4 from "./assets/item4.svg";
import item5 from "./assets/item5.svg";

const initialOptions = [
  { imageId: 1, text: "Структура ВКК" },
  { imageId: 2, text: "Организация" },
  { imageId: 3, text: "Реестр документов ВКК" },
  { imageId: 4, text: "Календарь ВКК" },
  { imageId: 5, text: "Тарифы и оплата" },
];

const initialIcons = [
  { id: 1, icon: item1 },
  { id: 2, icon: item2 },
  { id: 3, icon: item3 },
  { id: 4, icon: item4 },
  { id: 5, icon: item5 },
];

export class ProfileStore {
  options = initialOptions;
  icons = initialIcons;

  constructor() {
    makeAutoObservable(this);
  }
}

export default new ProfileStore();
