import { configureStore, combineReducers, Action, ThunkAction } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";

export const store = configureStore({
  reducer: {
    //
    //
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

//https://velog.io/@mael1657/Redux-toolkit%EC%9C%BC%EB%A1%9C-%EC%83%81%ED%83%9C%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0
