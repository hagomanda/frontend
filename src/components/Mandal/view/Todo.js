import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { format } from "date-fns";

import { saveTodo, getTodos } from "../../../reducers/todoSlice";
import RadioButton from "../../RadioButton";

const Title = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid #7a7a7a;
  margin: 0;
  font-size: 20px;
`;

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
  border-right: 1px solid #7a7a7a;

  * {
    margin: 4px;
  }

  label {
    margin: 0;
  }

  .checkbox {
    margin-right: 5px;
  }

  .add {
    width: 60%;
    height: 25%;
    padding: 8px 15px;
    font-size: 16px;
    border: none;
    border-radius: 6px;
    margin-top: 70px;
    background-color: #374661;
    color: #dce7f3;

    &:hover {
      cursor: pointer;
      background-color: #2d3347;
    }
  }
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

export default function Todo({ id, setShowModal, showModal }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isRepeat, setIsRepeat] = useState(false);
  const [repetition, setRepetition] = useState(EVERY_DAY);
  const [duration, setDuration] = useState(1);
  const loginState = useSelector(state => state.user.loginSucceed);
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todo.data);

  const getTodosOfDay = async () => {
    dispatch(
      getTodos({
        currentDate,
        days: ONE_DAY,
      }),
    );
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
    if (!todos[format(currentDate, "yyyy-MM-dd")]) {
      return <div> 저장된 일이 없습니다.</div>;
    }

    return todos[format(currentDate, "yyyy-MM-dd")]?.map((todo, i) => {
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

  const handleAddButton = () => {
    const options = {
      isRepeat,
      type: repetition,
      duration,
    };
    dispatch(saveTodo({ id, currentDate, options }));
    setShowModal(!showModal);
  };

  return (
    <>
      <Title>할일 저장하기</Title>
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
          {/* {isLoading ? <div>로딩 중</div> : <div>{showTodosInDate()}</div>} */}
          <div>{showTodosInDate()}</div>
          <input
            className="add"
            type="button"
            value="Add"
            onClick={handleAddButton}
          />
        </ContentContainer>
      </BodyContainer>
    </>
  );
}

Todo.propTypes = {
  id: PropTypes.string,
  setShowModal: PropTypes.func,
  showModal: PropTypes.bool,
};
