import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format, add, getDay } from "date-fns";
import styled from "styled-components";
import axios from "axios";

import Day from "./Day";

const CalendarHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .today-button {
    display: flex;
    margin: 10px;
    padding: 10px 25px;
    border: 1px solid rgb(148, 178, 235);
    border-radius: 6px;
    font-size: 16px;

    &:hover {
      background-color: rgb(148, 178, 235);
      cursor: pointer;
    }
  }

  .current-date {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .prev-button {
    margin: 0 10px;
    font-size: 30px;
    width: 35px;
    height: 35px;

    &:hover {
      background-color: #e6e6e6;
      border-radius: 50%;
      cursor: pointer;
    }
  }

  .next-button {
    margin: 0 10px;
    font-size: 30px;
    width: 35px;
    height: 35px;

    &:hover {
      background-color: #e6e6e6;
      border-radius: 50%;
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
`;

const Calendar = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-bottom: 20px;

  &.calendar {
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
      <CalendarHeader>
        <div onClick={goToday} className="today-button">
          오늘
        </div>
        <div className="current-date">
          <img
            src="/img/left.svg"
            onClick={handlePrevButtonClick}
            className="prev-button"
          />
          <div className="date">{format(currentDate, "yyyy년 MM월")}</div>
          <img
            src="/img/right.svg"
            onClick={handleNextButtonClick}
            className="next-button"
          />
        </div>
      </CalendarHeader>
      <Calendar className="calendar">{showWeekCalendar()}</Calendar>
    </>
  );
}
