import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}
const { persistAtom } = recoilPersist({
  key: "localStorage", //원하는 key 값 입력
  storage: localStorage,
});
export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "TO DO": [],
    DOING: [],
    DONE: [],
  },
  effects_UNSTABLE: [persistAtom],
});
