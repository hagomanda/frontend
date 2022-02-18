import { all, fork } from "redux-saga/effects";

import userSaga from "./userSaga";
import mandalSaga from "./mandalSaga";
import todoSaga from "./todoSaga";
import goalListSaga from "./goalListSaga";
import shareSaga from "./shareSaga";
import { chatSaga } from "./chatSaga";
export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(mandalSaga),
    fork(todoSaga),
    fork(goalListSaga),
    fork(shareSaga),
    fork(chatSaga),
  ]);
}
