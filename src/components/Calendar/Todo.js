import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import { changeCompletion } from "../../reducers/todoSlice";
import Modal from "../Modal/Modal";
import TodoModal from "./TodoModal";

const TodoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-bottom: 3px;
  padding: 10px;
  background-color: ${props => props.color};
  border-radius: 4px;

  &:hover {
    border: 1px solid black;
    transform: scale(1.01, 1.01);
    cursor: pointer;
  }
`;

const Title = styled.p`
  margin: 0;
  font-size: 20x;
  color: black;
  word-break: break-all;

  &.complete {
    font-size: 20x;
    color: grey;
    text-decoration: line-through;
  }
`;

const CheckButton = styled.img`
  width: 18%;
  height: 18%;
  margin: 0 5px;
`;

export default function Todo({ todo, date, color }) {
  const [showModal, setShowModal] = useState(false);
  const [isComplete, setIsComplete] = useState(todo.isComplete);
  const dispatch = useDispatch();
  const handleTodoClick = () => {
    setShowModal(true);
  };

  const handleCheckButtonClick = async (event, todoId) => {
    event.stopPropagation();
    dispatch(
      changeCompletion({
        todoId,
        date,
        isComplete: !isComplete,
      }),
    );

    setIsComplete(!isComplete);
  };

  return (
    <>
      <TodoContainer id={todo._id} onClick={handleTodoClick} color={color}>
        <CheckButton
          src={isComplete ? "/img/checkButton.png" : "/img/nounCheck.png"}
          onClick={event => handleCheckButtonClick(event, todo._id)}
        />
        <Title className={isComplete ? "complete" : null}>{todo.title}</Title>
      </TodoContainer>
      {showModal && (
        <Modal
          onClick={() => setShowModal(!showModal)}
          height="55%"
          width="50%"
          child={
            <TodoModal
              todo={todo}
              date={date}
              setShowModal={setShowModal}
              showModal={showModal}
            />
          }
        />
      )}
    </>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape({
    isComplete: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    memo: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }),
  date: PropTypes.string.isRequired,
  color: PropTypes.string,
};
