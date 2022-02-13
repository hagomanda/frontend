import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Todo from "./Todo";

const DayContainer = styled.div`
  font-family: "Acme", sans-serif;
  font-family: "Caveat", cursive;
  font-family: "Gochi Hand", cursive;
  font-family: "Quintessential", cursive;
  width: 30vw;
  height: 80vh;
  text-align: center;
  border: 1px solid #e9e9e9;
`;

const DayWrapper = styled.div`
  font-family: "Hanna", sans-serif;
  padding: 10px 0;
<<<<<<< HEAD
=======
  background: white;
>>>>>>> b90026e ([16] 달력 내부 투두 UI)
  background-color: rgb(148, 178, 235);
`;

const DateWrapper = styled.div`
  display: flex;
  justify-content: center;
  border-collapse: collapse;
  background-color: white;
  text-align: center;
  font-size: 25px;
  background-color: rgb(148, 178, 235);
`;

const DateContainer = styled.div`
  border: none;
  font-size: 20px;
`;

const TodoWrapper = styled.div`
  width: 100%;
  height: 86%;
`;

export default function Day({ day, date, todos }) {
  return (
    <DayContainer>
      <DateContainer>
        <DateWrapper>{date.slice(-2)}</DateWrapper>
        <DayWrapper>{day}</DayWrapper>
      </DateContainer>
      <TodoWrapper>{todos && <Todo date={date} todos={todos} />}</TodoWrapper>
    </DayContainer>
  );
}

Day.propTypes = {
  day: PropTypes.string.isRequired,
  date: PropTypes.string,
  todos: PropTypes.instanceOf(Array),
};
