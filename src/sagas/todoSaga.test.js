import { expectSaga } from "redux-saga-test-plan";
import {
  watchGetTodos,
  getTodosAPI,
  watchChangeCompletion,
  changeCompletionAPI,
  changeCompletionSaga,
} from "./todoSaga";
import { call } from "redux-saga/effects";
import {
  getTodos,
  getTodosSuccess,
  getTodosError,
  setTodos,
  changeCompletion,
  changeCompletionSuccess,
} from "../reducers/todoSlice";
describe("todoSaga 테스트", () => {
  describe("#1. todo 테스트", () => {
    it("get todos 성공", () => {
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

    it("get todos 실패", () => {
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
  });
});
