import React, { useState } from "react";
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
  top: 30px;
  right: 20px;
  font-size: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  display: inline-block;
  width: 20%;
  height: 18%;
  font-size: 20px;
  padding: 1em 2em;
  border-radius: 10px;
  color: rgb(148, 178, 235);
  margin-top: 10px;
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
  width: 200px;
  height: 100px;
`;

export default function TodoModal({ contents, date }) {
  const [memo, setMemo] = useState("");

  const handleSaveButtonClick = async () => {
    await axios.post(`/api/todos/memo/${contents._id}`, {
      date,
      memo,
    });
  };

  const handleDeleteButtonClick = async () => {
    await axios.delete(`/api/users/todos/${contents._id}`, {
      data: {
        date,
      },
    });
  };

  return (
    <>
      <Title>{`제목: ${contents.title}`}</Title>
      <Level>{`Lv.${contents.level}`}</Level>
      <Memo onChange={e => setMemo(e.target.value)}>
        {contents.addedInCalendar?.[date]?.memo
          ? contents.addedInCalendar?.[date]?.memo
          : "메모를 적어주세요!"}
      </Memo>
      <ButtonContainer>
        <Button onClick={handleSaveButtonClick}>Save</Button>
        <Button onClick={handleDeleteButtonClick}>Delete</Button>
      </ButtonContainer>
    </>
  );
}

TodoModal.propTypes = {
  contents: PropTypes.arrayOf(PropTypes.object).isRequired,
  date: PropTypes.string.isRequired,
};
