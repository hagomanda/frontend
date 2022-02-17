import { expectSaga } from "redux-saga-test-plan";
import { getTodosSaga, getTodosAPI } from "./todoSaga";
import { call, put } from "redux-saga/effects";
import {
  getTodosSuccess,
  getTodosError,
  setTodos,
} from "../reducers/todoSlice";

it("get todos Success", () => {
  const action = {
    payload: {
      currentDate: new Date(),
      days: 1,
    },
  };

  const res = {
    data: {
      result: "fake todo",
    },
  };

  return expectSaga(getTodosSaga, action)
    .provide([[call(getTodosAPI, action.payload), res]])
    .put({ type: setTodos.type, payload: "fake todo" })
    .dispatch({ type: getTodosSuccess.type })
    .run();
});

it("get todos Failure", () => {
  const action = {
    payload: {
      currentDate: new Date(),
      days: 1,
    },
  };

  const result = {
    data: {
      message: "Can't find any Todo",
    },
  };

  return expectSaga(getTodosSaga, action)
    .provide([[call(getTodosAPI, action.payload), result]])
    .put({ type: getTodosError.type, payload: "Can't find any Todo" })
    .dispatch({ type: getTodosSuccess.type })
    .run();
});
