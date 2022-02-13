import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format, add, getDay } from "date-fns";
import styled from "styled-components";
import axios from "axios";

import Day from "./Day";

const Calendar = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-bottom: 20px;

  .today-button {
    border: 1px solid rgb(148, 178, 235);
    border-radius: 6px;
    margin: 10px;
    padding: 10px 20px;

    &:hover {
      background-color: rgb(148, 178, 235);
      cursor: pointer;
    }
  }

  .week-button {
    margin: 0 10px;
    font-size: 30px;

    &:hover {
      cursor: pointer;
    }
  }

  .date {
    font-size: 25px;
  }

  .day {
    display: flex;
    justify-content: center;
  }

  &.calender {
    border-radius: 10px;
    margin-left: 5px;
  }
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

  const getUsersTodo = async () => {
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

  const showWeekCalendar = () => {
    return WEEK.map((day, i) => {
      const date = format(
        add(currentDate, { days: -1 * getDay(currentDate) + i }),
        "yyyy-MM-dd",
      );

      return (
        <>
          <Day
            className="day"
            day={day}
            date={date}
            key={date}
            todos={todos?.[date]}
          />
        </>
      );
    });
  };

  useEffect(() => {
    if (loginState) {
      getUsersTodo();
    }
  }, [loginState]);

  return (
    <>
      <Calendar>
        <div onClick={goToday} className="today-button">
          오늘
        </div>
        <div onClick={handlePrevButtonClick} className="week-button">{`<`}</div>
        <div className="date">{format(currentDate, "yyyy년 MM월")}</div>
        <div onClick={handleNextButtonClick} className="week-button">{`>`}</div>
      </Calendar>
      <Calendar className="calender">{showWeekCalendar()}</Calendar>
    </>
  );
}
