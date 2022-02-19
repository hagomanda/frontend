import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format, add, getDay } from "date-fns";
import styled from "styled-components";

import { getTodos } from "../../reducers/todoSlice";
import Day from "./Day";
import Loading from "../shared/Loading";

const CalendarHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;

  .today-button {
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
    align-items: center;
  }

  .prev-button,
  .next-button {
    width: 20px;
    height: 20px;
    margin: 0 10px;

    &:hover {
      background-color: #e6e6e6;
      border-radius: 50%;
      cursor: pointer;
    }
  }

  .date {
    font-size: 25px;
    padding-bottom: 3px;
  }

  .day {
    display: flex;
    justify-content: center;
  }
`;

const Calendar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const WEEK = ["일", "월", "화", "수", "목", "금", "토"];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const isFetching = useSelector(state => state.todo.isFetching);
  const dispatch = useDispatch();

  const handlePrevButtonClick = () => {
    setCurrentDate(add(currentDate, { days: -7 }));
  };
  const handleNextButtonClick = () => {
    setCurrentDate(add(currentDate, { days: 7 }));
  };
  const goToday = () => {
    setCurrentDate(new Date());
  };

  const showWeekCalendar = () => {
    return WEEK.map((day, i) => {
      const date = format(
        add(currentDate, { days: -1 * getDay(currentDate) + i }),
        "yyyy-MM-dd",
      );

      return <Day className="day" day={day} date={date} key={date} />;
    });
  };

  useEffect(() => {
    dispatch(
      getTodos({
        currentDate,
        days: 7,
      }),
    );
  }, [currentDate]);

  return (
    <div>
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
          <span className="date">{format(currentDate, "yyyy년 M월")}</span>
          <img
            src="/img/right.svg"
            onClick={handleNextButtonClick}
            className="next-button"
          />
        </div>
      </CalendarHeader>
      {isFetching ? (
        <Loading bgColor="white" contents="Data를 로딩 중입니다." />
      ) : (
        <Calendar className="calendar">{showWeekCalendar()}</Calendar>
      )}
    </div>
  );
}
