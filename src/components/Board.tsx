import { Draggable, Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { ITodo, toDoState } from "../atom";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div<{ $isDragging: boolean }>`
  padding: 10px 0px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;
interface IAreaProps {
  $isDraggingOver: boolean;
  $isDraggingFromThis: boolean;
}
const Area = styled.div<IAreaProps>`
  padding: 20px;
  background-color: ${(props) =>
    props.$isDraggingOver
      ? "#dfe6e9"
      : props.$isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`;
const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;
const Header = styled.div<{ isDragging: boolean }>`
  padding-top: 10px;
  border-radius: 5px 5px 0 0;
`;
interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
  index: number;
}
interface IForm {
  toDo: string;
}

function Board({ toDos, boardId, index }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };
  return (
    <Draggable draggableId={boardId} index={index}>
      {(provided, snapshot) => (
        <Wrapper
          key={boardId}
          ref={provided.innerRef}
          $isDragging={snapshot.isDragging}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Title>{boardId}</Title>
          <Form onSubmit={handleSubmit(onValid)}>
            <input
              {...register("toDo", { required: true })}
              type="text"
              placeholder={`Add task on ${boardId}`}
            />
          </Form>
          <Droppable droppableId={boardId} direction="vertical" type="CARD">
            {(provided, snapshot) => (
              <Area
                $isDraggingOver={snapshot.isDraggingOver}
                $isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {toDos.map((toDo, index) => (
                  <DraggableCard
                    toDoText={toDo.text}
                    toDoId={toDo.id}
                    index={index}
                    key={toDo.id}
                  />
                ))}
                {provided.placeholder}
              </Area>
            )}
          </Droppable>
        </Wrapper>
      )}
    </Draggable>
  );
}
export default Board;
