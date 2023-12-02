import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./redux/sagas/index";
import authReducer from "./redux/features/authSlice";
import userReducer from "./redux/features/userSlice";
import listEventsReducer from "./redux/features/listEventsSlice";
import eventReducer from "./redux/features/eventSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    events: listEventsReducer,
    eventDetail: eventReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
