import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format, add, getDay } from "date-fns";
import CalendarBox from "./CalendarBox";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
  border-collapse: collapse;
`;

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todos, setTodos] = useState([]);
  const loginState = useSelector(state => state.user.loginSucceed);

  const WEEK = ["일", "월", "화", "수", "목", "금", "토"];
  const handlePrevButtonClick = () => {
    setCurrentDate(add(currentDate, { days: -7 }));
  };
  const handleNextButtonClick = () => {
    setCurrentDate(add(currentDate, { days: 7 }));
  };

  const goToday = () => {
    setCurrentDate(new Date());
  };

  const getUsersTodo = async id => {
    const weekStart = add(currentDate, { days: -1 * getDay(currentDate) });
    const res = await axios.get("/api/users/todos", {
      headers: {
        currentDate: format(weekStart, "yyyy-MM-dd"),
        days: 7,
      },
    });

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
      getUsersTodo();
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
