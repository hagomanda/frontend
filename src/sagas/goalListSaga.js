import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  getGoalList,
  getGoalListSuccess,
  getGoalListError,
  setGoalList,
  deleteGoal,
  deleteGoalError,
} from "./goalListSlice";

export default function* goalListSaga() {
  yield all([fork(watchGetGoalList), fork(watchDeleteGoal)]);
}

function* watchGetGoalList() {
  yield takeLatest(getGoalList, getGoalListSaga);
}

function* watchDeleteGoal() {
  yield takeLatest(deleteGoal, deleteGoalSaga);
}

function* getGoalListSaga() {
  try {
    const res = yield call(getGoalListAPI);
   
    if (res.data.message) {
      yield put(getGoalListError(res.data.message));
    } else {
      yield put(getGoalListSuccess());
      yield put(setGoalList(res.data.result));
    }
  } catch (error) {
    yield put(getGoalListError(error.message));
  }
}

function* deleteGoalSaga(action) {
  try {
    const res = yield call(deleteGoalAPI, action.payload);
    
    if (res.data.message) {
      yield put(deleteGoalError(res.dadta.message));
    } else {
      yield put(getGoalList());
    }
  } catch (error) {
    yield put(deleteGoalError(error.message));
  }
}

const getGoalListAPI = async () => {
  const result = await axios.get("/api/users/goals");
  return result;
};

const deleteGoalAPI = async id => {
  const result = await axios.delete(`/api/goals/mainGoal/${id}`);
  return result;
};
