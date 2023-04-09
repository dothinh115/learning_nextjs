import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import movieReducer from "./movieReducer";
import userReducer from "./userReducer";

const store = configureStore({
  reducer: {
    movieReducer,
    userReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
