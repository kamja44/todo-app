import { Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ITodo } from "../atom";
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
  height: 30px;
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

const DeleteCard = ({ toDos, boardId }: IBoardProps) => {
  return (
    <>
      <Droppable droppableId={boardId} type="CARD">
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {provided.placeholder}
            <span>DELETE CARD</span>
          </Area>
        )}
      </Droppable>
    </>
  );
};
export default DeleteCard;
