import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { format, add, getDay } from "date-fns";
import axios from "axios";

import {
  getTodos,
  getTodosSuccess,
  getTodosError,
  saveTodo,
  saveTodoError,
  setTodosSuccess,
  setTodos,
  changeCompletion,
  changeCompletionSuccess,
  changeCompletionError,
  saveMemo,
  saveMemoSuccess,
  saveMemoError,
  deleteMemo,
  deleteMemoSuccess,
  deleteMemoError,
} from "../reducers/todoSlice";

export default function* todoSaga() {
  yield all([
    fork(watchGetTodos),
    fork(watchSetTodo),
    fork(watchSaveTodo),
    fork(watchChangeCompletion),
    fork(watchSaveMemo),
    fork(watchDeleteMemo),
  ]);
}

export function* watchGetTodos() {
  yield takeLatest(getTodos, getTodosSaga);
}

function* watchSaveTodo() {
  yield takeLatest(saveTodo, saveTodoSaga);
}

export function* watchChangeCompletion() {
  yield takeEvery(changeCompletion, changeCompletionSaga);
}

function* watchSaveMemo() {
  yield takeLatest(saveMemo, saveMemoSaga);
}

function* watchDeleteMemo() {
  yield takeLatest(deleteMemo, deleteMemoSaga);
}

function* watchSetTodo() {
  yield takeEvery(setTodos, setTodosSaga);
}

function* setTodosSaga(action) {
  yield put(setTodosSuccess(action.payload));
}

export function* getTodosSaga(action) {
  try {
    const res = yield call(getTodosAPI, action.payload);

    if (res.data.message) {
      yield put(getTodosError(res.data.message));
    } else {
      yield put(setTodos(res.data.result));
      yield put(getTodosSuccess());
    }
  } catch (error) {
    yield put(getTodosError(error.message));
  }
}

function* saveTodoSaga(action) {
  try {
    yield call(saveTodoAPI, action.payload);
  } catch (error) {
    put(saveTodoError(error.message));
  }
}

export function* changeCompletionSaga(action) {
  try {
    const res = yield call(changeCompletionAPI, action.payload);

    if (res.data.message) {
      yield put(changeCompletionError(res.data.message));
    } else {
      yield put(changeCompletionSuccess(action.payload));
      const currentDate = new Date(action.payload.date);
      const res = yield call(getTodosAPI, { currentDate, days: 7 });
      yield put(setTodos(res.data.result));
    }
  } catch (error) {
    yield put(changeCompletionError(error.message));
  }
}

function* saveMemoSaga(action) {
  try {
    const res = yield call(saveMemoAPI, action.payload);

    if (res.data.message) {
      yield put(saveMemoError(res.data.message));
    } else {
      yield put(saveMemoSuccess());
      const currentDate = new Date(action.payload.date);
      yield put(getTodos({ currentDate, days: 7 }));
    }
  } catch (error) {
    yield put(saveMemoError(error.message));
  }
}

function* deleteMemoSaga(action) {
  try {
    const res = yield call(deleteMemoAPI, action.payload);

    if (res.data.message) {
      yield put(deleteMemoError(res.data.message));
    } else {
      yield put(deleteMemoSuccess());
      const currentDate = new Date(action.payload.date);
      yield put(getTodos({ currentDate, days: 7 }));
    }
  } catch (error) {
    yield put(deleteMemoError(error));
  }
}

export async function getTodosAPI(req) {
  const { currentDate, days } = req;
  const weekStart = add(currentDate, { days: -1 * getDay(currentDate) });
  const startDate = days === 1 ? currentDate : weekStart;
  const result = await axios.get("/api/users/todos", {
    headers: {
      currentDate: format(startDate, "yyyy-MM-dd"),
      days,
    },
  });

  return result;
}

async function saveTodoAPI(req) {
  const { id, currentDate: date, options: repetition } = req;
  const result = await axios.post(`/api/todos/${id}`, { date, repetition });

  return result;
}

export async function changeCompletionAPI(req) {
  console.log(req);
  const { todoId, isComplete, date } = req;

  const result = await axios.put(`/api/todos/calendar/${todoId}`, {
    isComplete,
    date,
  });
  return result;
}

async function saveMemoAPI(req) {
  const { todoId, date, memo } = req;

  const result = await axios.post(`/api/todos/memo/${todoId}`, {
    date,
    memo,
  });

  return result;
}

async function deleteMemoAPI(req) {
  const { todoId, date } = req;

  const result = await axios.delete(`/api/todos/${todoId}`, {
    data: {
      date,
    },
  });

  return result;
}
