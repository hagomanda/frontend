import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../features/saga";
import userReducer from "../features/userSlice";
import viewReducer from "../features/viewSlice";
import editReducer from "../features/editSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: userReducer,
    view: viewReducer,
    edit: editReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
