import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atom";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((prev) => {
      const targetIndex = prev.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };

      return [
        ...prev.slice(0, targetIndex),
        newToDo,
        ...prev.slice(targetIndex + 1),
      ];
    });
  };
  const onDeleteToDo = () => {
    setToDos((prev) => {
      const targetIndex = prev.findIndex((toDo) => toDo.id === id);
      return [...prev.slice(0, targetIndex), ...prev.slice(targetIndex + 1)];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TODO && (
        <button name={Categories.TODO} onClick={onClick}>
          TO DO
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      <button onClick={onDeleteToDo}>Delete</button>
    </li>
  );
}
export default ToDo;
