import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format, add, getDay } from "date-fns";
import CalenderBox from "./CalendarBox";
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

  const WEEK = ["일", "화", "수", "목", "금", "토", "월"];
  const handleLeft = () => {
    setCurrentDate(add(currentDate, { days: -7 }));
  };
  const handleRight = () => {
    setCurrentDate(add(currentDate, { days: 7 }));
  };

  const goToday = () => {
    setCurrentDate(new Date());
  };

  const getUsersTodo = async id => {
    const currentSunday = add(currentDate, { days: -1 * getDay(currentDate) });
    const res = await axios.get("/api/todos", {
      headers: {
        currentDate: format(currentSunday, "yyyy-MM-dd"),
      },
    });

    if (res.data.result === "error") {
      return;
    }

    setTodos(res.data.result);
  };

  const showCalender = () => {
    return WEEK.map((day, i) => {
      const date = format(
        add(currentDate, { days: -1 * getDay(currentDate) + i }),
        "yyyy-MM-dd",
      );

      return (
        <CalenderBox day={day} date={date} key={date} todo={todos?.[date]} />
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
        <div onClick={handleLeft}>{`<`}</div>
        {format(currentDate, "yyyy년 MM월")}
        <div onClick={handleRight}>{`>`}</div>
      </Container>
      <Container>{showCalender()}</Container>
    </div>
  );
}
