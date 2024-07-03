import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atom";
/*
[
  {
    text: "5",
    category: "TODO",
    id: 1719998187737,
  },
  {
    text: "4",
    category: "TODO",
    id: 1719998187189,
  },
  {
    text: "3",
    category: "TODO",
    id: 1719998186864,
  },
  {
    text: "2",
    category: "TODO",
    id: 1719998186531,
  },
  {
    text: "1",
    category: "TODO",
    id: 1719998186071,
  },
];
 */
function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((prev) => {
      const targetIndex = prev.findIndex((toDo) => toDo.id === id);
      const oldToDo = prev[targetIndex];
      const newToDo = { text, id, category: name };
      console.log(oldToDo, newToDo);
      return prev;
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== "DOING" && (
        <button name="DOING" onClick={onClick}>
          Doing
        </button>
      )}
      {category !== "TODO" && (
        <button name="TODO" onClick={onClick}>
          TO DO
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}
export default ToDo;
