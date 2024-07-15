import React from "react";
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  DropResult,
} from "react-beautiful-dnd";
import { GlobalStyle } from "./components/GlobalStyle";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDoState } from "./atom";
import Board from "./components/Board";
import { useForm } from "react-hook-form";
import DeleteBoard from "./components/DeleteBoard";
import DeleteCard from "./components/DeleteCard";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  margin-top: 10vh;
  /* height: 70vh; */
  margin-bottom: 10vh;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;
const AddForm = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: end;
`;
interface IForm {
  addToDo: string;
}

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ addToDo }: IForm) => {
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [addToDo]: [],
      };
    });
    setValue("addToDo", "");
  };
  const onDragEnd = (info: DropResult) => {
    const { destination, source, type } = info;
    console.log(info);
    if (!destination) return;
    if (type === "CARD" && destination?.droppableId === source.droppableId) {
      //same board movement
      setToDos((allBoards) => {
        console.log({ ...allBoards });
        console.log(type);
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (
      destination.droppableId !== "Remove" &&
      type === "CARD" &&
      destination.droppableId !== source.droppableId
    ) {
      // cross board movement
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        console.log({ ...allBoards[destination.droppableId] });
        const destinationBoard = [...allBoards[destination.droppableId]];

        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
    if (destination.droppableId === "Remove") {
      setToDos((allBoards) => {
        //console.log(allBoards);
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (source.droppableId && destination.droppableId === "Boards") {
      setToDos((allBoards) => {
        const boardList = Object.keys(allBoards);
        const taskObj = boardList[source.index];
        boardList.splice(source.index, 1);
        boardList.splice(destination?.index, 0, taskObj);
        let boards = {};
        boardList.map((board) => {
          boards = { ...boards, [board]: allBoards[board] };
        });
        return {
          ...boards,
        };
      });
    }
    if (destination.droppableId === "DeleteBoard") {
      setToDos((allBoards) => {
        const boardList = Object.keys(allBoards);
        const taskObj = boardList[source.index];
        boardList.splice(source.index, 1);
        console.log(boardList);
        let boards = {};
        boardList.map((board) => {
          boards = { ...boards, [board]: allBoards[board] };
        });
        return {
          ...boards,
        };
      });
    }
  };
  return (
    <>
      <GlobalStyle />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <AddForm>
            <form onSubmit={handleSubmit(onValid)}>
              <input
                type="text"
                {...register("addToDo", {
                  required: true,
                })}
                placeholder={`CREATE NEW BOARD`}
              />
              <button>CREATE</button>
            </form>
          </AddForm>
          <DeleteBoard boardId={"DeleteBoard"} />
          <DeleteCard boardId={"Remove"} />
          <Droppable droppableId="Boards" direction="horizontal" type="BOARD">
            {(
              provided: DroppableProvided,
              {
                isDraggingOver,
                draggingOverWith,
                draggingFromThisWith,
                isUsingPlaceholder,
              }: DroppableStateSnapshot
            ) => (
              <Boards ref={provided.innerRef} {...provided.droppableProps}>
                {Object.keys(toDos).map((boardId, index) => (
                  <Board
                    boardId={boardId}
                    key={boardId}
                    toDos={toDos[boardId]}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </Boards>
            )}
          </Droppable>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
