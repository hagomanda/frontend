import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { format, parseISO } from "date-fns";

import Todo from "./Todo";

function randomColor() {
  const r = (Math.round(Math.random() * 127) + 127).toString(16);
  const g = (Math.round(Math.random() * 127) + 127).toString(16);
  const b = (Math.round(Math.random() * 127) + 127).toString(16);

  return "#" + r + g + b;
}

const dayTodoTask = {};

const DayContainer = styled.div`
  width: 12vw;
  height: 70vh;
  text-align: center;
  border: 1px solid #e9e9e9;
  border-collapse: collapse;
`;

const DayWrapper = styled.p`
  font-size: 20px;
`;

const DateWrapper = styled.p`
  font-size: 25px;
`;

const DateContainer = styled.div`
  background-color: rgb(148, 178, 235);
  padding: 5px;
  text-align: center;
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
            if (!dayTodoTask[todo._id]) {
              dayTodoTask[todo._id] = randomColor();
            }
            return (
              <Todo
                key={todo._id}
                todo={todo}
                date={date}
                color={dayTodoTask[todo._id]}
              />
            );
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
