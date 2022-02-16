import {
  put,
  takeLatest,
  fork,
  call,
  all,
  take,
  takeEvery,
} from "redux-saga/effects";
import axios from "axios";

import {
  getMandal,
  setMandal,
  getMandalSuccess,
  getMandalError,
  createMandal,
  createMandalError,
  createMandalSuccess,
  modifyMandal,
  modifyMandalError,
} from "./mandalSlice";
import { createSocketChannel } from "./createSocketChannel";
import { socketAction } from "../features/socket";
import { ROLE } from "../constants";

export default function* mandalSaga() {
  yield all([
    fork(watchGetMandal),
    fork(onNewMandal, "modifySuccess"),
    fork(watchModifyMandal),
    fork(watchCreatMandal),
  ]);
}

function* watchGetMandal() {
  yield takeLatest(getMandal, getMandalSaga);
}

function* watchModifyMandal() {
  yield takeEvery(modifyMandal, modifyMandalSaga);
}

function* watchCreatMandal() {
  yield takeLatest(createMandal, createMandalSaga);
}

function* getMandalSaga(action) {
  try {
    const res = yield call(getMainGoalAPI, action.payload);

    if (res.data.message) {
      yield put(getMandalError(res.data.message));
    } else {
      res.data.result.mainGoal["_id"] = action.payload;

      yield put(setMandal(res.data.result.mainGoal));
      yield put(getMandalSuccess());
    }
  } catch (error) {
    yield put(getMandalError(error.message));
  }
}

function* modifyMandalSaga(action) {
  try {
    const res = yield call(modifyMandalAPI, action.payload);
    if (res.data.message) {
      yield put(modifyMandalError(res.data.message));
    } else {
      yield fork(
        socketAction.modifyMandal,
        res.data.data,
        action.payload.mainGoalId,
      );
    }
  } catch (error) {
    yield put(modifyMandalError(error.message));
  }
}

function* createMandalSaga(action) {
  try {
    const res = yield call(createMandalAPI, action.payload);
    if (res.data.message) {
      yield put(createMandalError(res.data.message));
    }

    yield put(createMandalSuccess(res.data.result.mainGoalId));
  } catch (error) {
    yield put(createMandalError(error.message));
  }
}

async function getMainGoalAPI(id) {
  const result = await axios.get(`/api/goals/mainGoal/${id}`);

  return result;
}

async function modifyMandalAPI(req) {
  const { boxId, title, mainGoalId, role } = req;
  let result = null;

  switch (role) {
    case ROLE.MAIN:
      result = await axios.put(`/api/goals/mainGoal/${boxId}`, {
        title,
      });
      break;
    case ROLE.SUBGOAL || ROLE.SUBMAIN:
      result = await axios.put(`/api/goals/subGoal/${boxId}`, {
        title,
        mainGoalId,
      });
      break;
    case ROLE.TODO:
      result = await axios.put(`/api/todos/${boxId}`, {
        title,
        mainGoalId,
      });
      break;
  }

  return result;
}

async function createMandalAPI(req) {
  const result = await axios.post("/api/goals/mainGoal", {
    title: req,
  });

  return result;
}

function* onNewMandal(type) {
  const channel = yield call(createSocketChannel, type);

  while (true) {
    try {
      const newMandal = yield take(channel);

      yield put(setMandal(newMandal));
    } catch (e) {
      alert(e.message);
    }
  }
}
