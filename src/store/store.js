import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";

import rootSaga from "../sagas";
import userReducer from "../reducers/userSlice";
import mandalReducer from "../reducers/mandalSlice";
import editReducer from "../reducers/editSlice";
import todoReducer from "../reducers/todoSlice";
import goalListReducer from "../reducers/goalListSlice";
import shareReducer from "../reducers/shareSlice";

const customHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
  context: {
    history: customHistory,
  },
});

export const store = configureStore({
  reducer: {
    user: userReducer,
    mandal: mandalReducer,
    edit: editReducer,
    todo: todoReducer,
    goalList: goalListReducer,
    share: shareReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
