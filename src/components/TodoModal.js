import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import styled from "styled-components";

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
  margin-top: 80px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  width: 20%;
  height: 18%;
  font-size: 20px;
  padding: 1em 2em;
  border-radius: 10px;
  color: rgb(148, 178, 235);
  margin: 10px;
  font-weight: bold;
  font-size: 0.8rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;
  background: linear-gradient(
    to right,
    rgba(#b2876f, 0) 25%,
    rgba(#b2876f, 0.8) 75%
  );
  background-position: 1% 50%;
  background-size: 400% 300%;
  border: 1px solid rgb(148, 178, 235);
  @include transition;

  &:hover {
    color: brown;
    background-position: 99% 50%;
    cursor: pointer;
  }
`;

const Memo = styled.textarea`
  width: 450px;
  height: 200px;
  font-size: 20px;
`;

export default function TodoModal({ todo, date, setShowModal, showModal }) {
  const [memo, setMemo] = useState(todo.memo);

  const handleSaveButtonClick = async () => {
    await axios.post(`/api/todos/memo/${todo._id}`, {
      date,
      memo,
    });

    setShowModal(!showModal);
  };

  const handleDeleteButtonClick = async () => {
    await axios.delete(`/api/todos/${todo._id}`, {
      data: {
        date,
      },
    });

    setShowModal(!showModal);
  };

  return (
    <>
      <Title>{`제목: ${todo.title}`}</Title>
      <Level>{todo.level ? `Lv.${todo.level}` : "Lv.0"}</Level>
      <Memo onChange={e => setMemo(e.target.value)}>
        {todo.memo ? todo.memo : "메모를 적어주세요!"}
      </Memo>
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
