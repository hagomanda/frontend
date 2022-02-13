import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Modal from "./Modal";
import TodoModal from "./TodoModal";

const randomColor = Math.floor(Math.random() * 16777215).toString(16);

const TodoContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-bottom: 5px;
  border: none;
  border-radius: 4px;
  background-color: black;

  &:hover {
    border: 1px solid black;
    transform: scale(1.01, 1.01);
    cursor: pointer;
  }
`;

const Title = styled.p`
  font-size: 20x;
  color: black;

  &.complete {
    font-size: 20x;
    color: grey;
    text-decoration: line-through;
  }
`;

const CheckButton = styled.img`
  display: flex;
  align-items: center;
  width: 25%;
  height: 25%;
  margin: 0 12px;
`;

const NounCheckButton = styled.img`
  display: flex;
  align-items: center;
  width: 25%;
  height: 25%;
  margin: 0 12px;
`;

export default function Todo({ todos, date }) {
  const [isComplete, setIsComplete] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleTodoClick = () => {
    setShowModal(true);
  };

  const handleCheckButtonClick = event => {
    setIsComplete(!isComplete);
    event.stopPropagation();
  };

  return (
    <>
      {todos.forEach(todo => {
        return (
          <TodoContainer>
            {isComplete ? (
              <CheckButton
                src={"/img/checkButton.png"}
                onClick={handleCheckButtonClick}
              />
            ) : (
              <NounCheckButton
                src={"/img/nounCheck.png"}
                onClick={handleCheckButtonClick}
              />
            )}
            <Title
              className={isComplete ? "complete" : null}
              onClick={handleTodoClick}
            >
              {todo.title}
            </Title>
          </TodoContainer>
        );
      })}
      {showModal && (
        <Modal child={<TodoModal contents={todos} date={date} />} />
      )}
    </>
  );
}

Todo.propTypes = {
  todos: PropTypes.instanceOf(Array),
  date: PropTypes.string,
};
