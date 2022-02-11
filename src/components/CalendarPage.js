import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format, add, getDay } from "date-fns";
import styled from "styled-components";
import axios from "axios";

import CalendarBox from "./CalendarBox";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border-collapse: collapse;
`;

const WEEK = ["일", "월", "화", "수", "목", "금", "토"];
const ONE_WEEK = 7;

const getUsersTodo = async (date, days) => {
  const result = await axios.get("/api/users/todos", {
    headers: {
      currentDate: format(date, "yyyy-MM-dd"),
      days,
    },
  });
  return result;
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todos, setTodos] = useState([]);
  const loginState = useSelector(state => state.user.loginSucceed);

  const handlePrevButtonClick = () => {
    setCurrentDate(add(currentDate, { days: -7 }));
  };
  const handleNextButtonClick = () => {
    setCurrentDate(add(currentDate, { days: 7 }));
  };

  const goToday = () => {
    setCurrentDate(new Date());
  };

  const getTodosOfWeek = async () => {
    const weekStart = add(currentDate, { days: -1 * getDay(currentDate) });
    const res = await getUsersTodo(weekStart, ONE_WEEK);

    if (res.data.result === "error") {
      return;
    }

    setTodos(res.data.result);
  };

  const showCalendar = () => {
    return WEEK.map((day, i) => {
      const date = format(
        add(currentDate, { days: -1 * getDay(currentDate) + i }),
        "yyyy-MM-dd",
      );

      return (
        <CalendarBox day={day} date={date} key={date} todo={todos?.[date]} />
      );
    });
  };

  useEffect(() => {
    if (loginState) {
      getTodosOfWeek();
    }
  }, [loginState]);

  return (
    <div>
      <Container>
        <div onClick={goToday}>오늘</div>
        <div onClick={handlePrevButtonClick}>{`<`}</div>
        {format(currentDate, "yyyy년 MM월")}
        <div onClick={handleNextButtonClick}>{`>`}</div>
      </Container>
      <Container>{showCalendar()}</Container>
    </div>
  );
}
