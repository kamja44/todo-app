import styled from "styled-components";
import { ITodo } from "../atom";
import { Droppable } from "react-beautiful-dnd";
interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}
interface IBoardProps {
  toDos?: ITodo[];
  boardId: string;
}
const Area = styled.div<IAreaProps>`
  display: flex;
  margin: 0 0 10px 0;
  width: 100%;
  height: 100px;
  background-color: white;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  span {
    color: black;
    position: fixed;
    font-size: 24px;
    font-weight: 600;
  }
`;
const DeleteBoard = ({ toDos, boardId }: IBoardProps) => {
  return (
    <>
      <Droppable droppableId={boardId} type="BOARD">
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {provided.placeholder}
            <span>DELETE BOARD</span>
          </Area>
        )}
      </Droppable>
    </>
  );
};

export default DeleteBoard;
