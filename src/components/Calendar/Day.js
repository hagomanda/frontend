import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { format, parseISO } from "date-fns";

import Todo from "./Todo";

const DayContainer = styled.div`
  width: 12vw;
  height: 70vh;
  text-align: center;
  border: 1px solid #e9e9e9;
`;

const DayWrapper = styled.div`
  padding-top: 5px;
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
  padding-bottom: 5px;
`;

const DateContainer = styled.div`
  border: none;
`;

const TodoWrapper = styled.div`
  width: 100%;
  height: 86%;
`;

export default function Day({ day, date, todos }) {
  return (
    <DayContainer>
      <DateContainer>
        <DayWrapper>{day}</DayWrapper>
        <DateWrapper>{format(parseISO(date), "d")}</DateWrapper>
      </DateContainer>
      <TodoWrapper>
        {todos &&
          todos.map(todo => {
            return <Todo key={todo._id} todo={todo} date={date} />;
          })}
      </TodoWrapper>
    </DayContainer>
  );
}

Day.propTypes = {
  day: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  todos: PropTypes.arrayOf(Object),
};
