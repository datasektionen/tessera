import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
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
import myTicketsSlice from "./redux/features/myTicketsSlice";
import createTicketReleaseSlice from "./redux/features/createTicketReleaseSlice";
import ticketTypeSlice from "./redux/features/ticketTypeSlice";
import eventTicketsSlice from "./redux/features/eventTicketsSlice";
import ticketReleaseSlice from "./redux/features/ticketReleaseSlice";
import serverTimestampSlice from "./redux/features/serverTimestampSlice";
import listOrganizationsSlice from "./redux/features/listOrganizationsSlice";
import paymentSuccessReducer from "./redux/features/paymentSlice";
import salesReportSlice from "./redux/features/salesReportSlice";
import languageSlice from "./redux/features/languageSlice";
import addonCreationSlice from "./redux/features/addonCreationSlice";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  whitelist: [
    "user",
    "auth",
    "eventCreation",
    "ticketTypeCreation",
    "timestamp",
    "language",
  ],
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
  myTickets: myTicketsSlice,
  createTicketRelease: createTicketReleaseSlice,
  ticketTypes: ticketTypeSlice,
  eventTickets: eventTicketsSlice,
  ticketRelease: ticketReleaseSlice,
  timestamp: serverTimestampSlice,
  organizations: listOrganizationsSlice,
  payment: paymentSuccessReducer,
  salesReport: salesReportSlice,
  language: languageSlice,
  addonCreation: addonCreationSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

if (process.env.NODE_ENV === "development") {
  console.log("Development mode");
}

export const store = configureStore({
  devTools: process.env.NODE_ENV === "development",
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
