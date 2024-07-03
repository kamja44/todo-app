import { atom } from "recoil";
export interface IToDo {
  text: string;
  category: "TODO" | "DOING" | "DONE";
  id: number;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
