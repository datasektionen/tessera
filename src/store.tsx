import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./redux/sagas/index";
import authReducer from "./redux/features/authSlice";
import userReducer from "./redux/features/userSlice";
import listEventsReducer from "./redux/features/listEventsSlice";
import eventReducer from "./redux/features/eventSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import ticketRequestReducer from "./redux/features/ticketRequestSlice";
import foodPreferenceReducer from "./redux/features/userFoodPreferences";
import organizationReducer from "./redux/features/organizationSlice";
import eventCreationSlice from "./redux/features/eventCreationSlice";
import ticketReleaseMethodReducer from "./redux/features/ticketReleaseMethodsSlice";
import ticketTypeCreationReducer from "./redux/features/ticketTypeCreationSlice";
import promoCodeAccessSlice from "./redux/features/promoCodeAccessSlice";
import myTicketRequestsSlice from "./redux/features/myTicketRequestsSlice";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  whitelist: ["user", "auth", "eventCreation", "ticketTypeCreation"],
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  events: listEventsReducer,
  eventDetail: eventReducer,
  ticketRequest: ticketRequestReducer,
  foodPreferences: foodPreferenceReducer,
  organization: organizationReducer,
  eventCreation: eventCreationSlice,
  ticketReleaseMethods: ticketReleaseMethodReducer,
  ticketTypeCreation: ticketTypeCreationReducer,
  promoCodeAccess: promoCodeAccessSlice,
  myTicketRequests: myTicketRequestsSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
