import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import { saveMemo, deleteMemo } from "../../reducers/todoSlice";

const Title = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const Level = styled.p`
  display: flex;
  position: absolute;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  top: 10px;
  left: 30px;
  font-size: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 60px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  width: 20%;
  height: 18%;
  margin: 10px;
  padding: 1em 2em;
  border-radius: 10px;
  color: rgb(148, 178, 235);
  font-weight: bold;
  font-size: 0.8rem;
  border: 1px solid rgb(148, 178, 235);

  &:hover {
    border: 1px solid #0000ff;
    color: #0000ff;
    cursor: pointer;
  }
`;

const Memo = styled.textarea`
  width: 450px;
  height: 200px;
  font-size: 20px;
  margin-top: 10px;
`;

export default function TodoModal({ todo, date, setShowModal, showModal }) {
  const [memo, setMemo] = useState(todo.memo);
  const dispatch = useDispatch();
  const todoId = todo._id;

  const handleSaveButtonClick = async () => {
    dispatch(saveMemo({ todoId, date, memo }));

    setShowModal(!showModal);
  };

  const handleDeleteButtonClick = async () => {
    dispatch(deleteMemo({ todoId, date }));
    setShowModal(!showModal);
  };

  return (
    <>
      <Title>{`제목: ${todo.title}`}</Title>
      <Level>{todo.level ? `Lv.${todo.level}` : "Lv.0"}</Level>
      <Memo
        onChange={e => setMemo(e.target.value)}
        placeholder="메모를 적어주세요!"
        defaultValue={memo}
      />
      <ButtonContainer>
        <Button onClick={handleSaveButtonClick}>Save</Button>
        <Button onClick={handleDeleteButtonClick}>Delete</Button>
      </ButtonContainer>
    </>
  );
}

TodoModal.propTypes = {
  todo: PropTypes.shape({
    isComplete: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    memo: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    level: PropTypes.number,
  }),
  date: PropTypes.string.isRequired,
  setShowModal: PropTypes.func,
  showModal: PropTypes.bool,
};
