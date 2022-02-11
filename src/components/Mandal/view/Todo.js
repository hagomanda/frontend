import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { format, getDay } from "date-fns";
import RadioButton from "./RadioButton";
import styled from "styled-components";

const BodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const ContentContainer = styled.div`
  width: 50%;
  margin-top: 10px;
  text-align: center;
  align-items: center;
`;

const RadioButtonContainer = styled.div`
  align-items: center;
  text-align: center;
`;

const EVERY_DAY = "EVERY_DAY";
const EVERY_WEEK = "EVERY_WEEK";
const ONE_DAY = 1;
const REPETITION = [
  "REPETITION",
  { value: EVERY_DAY, content: "매일" },
  { value: EVERY_WEEK, content: "매주" },
];
const DURATION = [
  "DURATION",
  { value: 1, content: "1주" },
  { value: 2, content: "2주" },
  { value: 3, content: "3주" },
];

const getUsersTodo = async (date, days) => {
  const result = await axios.get("/api/users/todos", {
    headers: {
      currentDate: format(date, "yyyy-MM-dd"),
      days,
    },
  });
  return result;
};

const saveTodo = async (todoId, date, repetition) => {
  const result = await axios.post(`/api/todos/${todoId}`, { date, repetition });
};

export default function Todo({ id }) {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isRepeat, setIsRepeat] = useState(false);
  const [repetition, setRepetition] = useState(EVERY_DAY);
  const [duration, setDuration] = useState(1);
  const loginState = useSelector(state => state.user.loginSucceed);

  const getTodosOfDay = async () => {
    const res = await getUsersTodo(currentDate, ONE_DAY);
    if (res.data.result === "error") {
      return;
    }

    setTodos(res.data.result[format(currentDate, "yyyy-MM-dd")]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (loginState) {
      getTodosOfDay();
    }
  }, [loginState, currentDate]);

  const handleDateChange = event => {
    setCurrentDate(new Date(event.target.value));
  };

  const showTodosInDate = () => {
    if (!todos) {
      return <div> 저장된 일이 없습니다.</div>;
    }
    return todos?.map((todo, i) => {
      return (
        <div key={i}>
          {todo.title} {todo.isComplete}
        </div>
      );
    });
  };

  const handleRepetitionCheck = event => {
    event.target.checked ? setIsRepeat(true) : setIsRepeat(false);
  };

  const handleRepetitionButton = event => {
    setRepetition(event.target.value);
  };

  const handleSelectButton = event => {
    setDuration(event.target.value);
  };

  return (
    <>
      <div>할일 저장하기</div> <hr />
      <BodyContainer>
        <ContentContainer>
          <input
            type="date"
            value={format(currentDate, "yyyy-MM-dd")}
            onChange={handleDateChange}
          />
          <input
            type="checkbox"
            id="repetitionCheckBox"
            name="repetitionCheckBox"
            onChange={handleRepetitionCheck}
          />
          <label htmlFor="repetitionCheckBox"> 반복</label>
          {isRepeat && (
            <RadioButtonContainer>
              <RadioButton
                handleOnChange={handleRepetitionButton}
                options={REPETITION}
              />
              <RadioButton
                handleOnChange={handleSelectButton}
                options={DURATION}
              />
            </RadioButtonContainer>
          )}
        </ContentContainer>
        <ContentContainer>
          <div>저장된 할 일들</div>
          {isLoading ? <div>로딩 중</div> : <div>{showTodosInDate()}</div>}
          <input
            type="button"
            value="Add"
            onClick={() =>
              saveTodo(id, currentDate, {
                isRepeat,
                type: repetition,
                duration,
              })
            }
          />
        </ContentContainer>
      </BodyContainer>
    </>
  );
}

Todo.propTypes = {
  id: PropTypes.string,
};
