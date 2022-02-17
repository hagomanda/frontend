import { expectSaga } from "redux-saga-test-plan";
import { watchGetTodos, getTodosAPI } from "./todoSaga";
import { call } from "redux-saga/effects";
import {
  getTodos,
  getTodosSuccess,
  getTodosError,
  setTodos,
} from "../reducers/todoSlice";

it("get todos Success", () => {
  const payload = {
    currentDate: new Date(),
    days: 1,
  };

  const res = {
    data: {
      result: "fake todo",
    },
  };

  return expectSaga(watchGetTodos)
    .withReducer(getTodos)
    .dispatch({ type: getTodos.type, payload: payload })
    .provide([[call(getTodosAPI, payload), res]])
    .put({ type: setTodos.type, payload: "fake todo" })
    .put({ type: getTodosSuccess.type, payload: undefined })
    .silentRun();
});

it("get todos Failure", () => {
  const payload = {
    currentDate: new Date(),
    days: 1,
  };

  const result = {
    data: {
      message: "Can't find any Todo",
    },
  };

  return expectSaga(watchGetTodos)
    .withReducer(getTodos)
    .dispatch({ type: getTodos.type, payload })
    .provide([[call(getTodosAPI, payload), result]])
    .put({ type: getTodosError.type, payload: "Can't find any Todo" })
    .dispatch({ type: getTodosSuccess.type })
    .silentRun();
});
