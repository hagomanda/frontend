import { all, fork, call, takeLatest, take } from "redux-saga/effects";
import { createSocketChannel } from "./createSocketChannel";
import axios from "axios";
import {
  getMessages,
  getMessagesError,
  setMessages,
  setToken,
  saveMessages,
  saveMessagesError,
} from "../reducers/chatSlice";
import { put } from "redux-saga-test-plan/matchers";

export function* chatSaga() {
  yield all([
    fork(watchGetMessages),
    fork(onWatchChat, "message"),
    fork(watchSaveMessages),
  ]);

  function* watchGetMessages() {
    yield takeLatest(getMessages, getMessagesSaga);
  }

  function* onWatchChat(type) {
    const channel = yield call(createSocketChannel, type);

    while (true) {
      try {
        const newMessages = yield take(channel);
        yield put(setMessages(newMessages));
      } catch (e) {
        alert(e.message);
      }
    }
  }

  function* watchSaveMessages() {
    yield takeLatest(saveMessages, saveMessagesSaga);
  }

  function* getMessagesSaga(action) {
    try {
      const res = yield call(getMessagesAPI, action.payload);
      if (res.data.message) {
        yield put(getMessagesError(res.data.message));
      } else {
        const { messages, nextPageToken } = res.data.result;
        yield put(setMessages(messages));
        yield put(setToken(nextPageToken));
      }
    } catch (error) {
      yield put(getMessagesError(error.message));
    }
  }

  function* saveMessagesSaga(action) {
    try {
      yield call(saveMessagesAPI, action.payload);
    } catch (error) {
      yield put(saveMessagesError(error.message));
    }
  }

  async function getMessagesAPI(req) {
    const { id, token } = req;
    const url = token
      ? `/api/chats/${id}?nextPageToken=${token}`
      : `/api/chats/${id}`;
    const result = await axios.get(url);
    return result;
  }

  async function saveMessagesAPI(req) {
    const { id, message, createdAt } = req;
    await axios.post(`/api/chats/${id}`, {
      id,
      message,
      createdAt,
    });
  }
}
