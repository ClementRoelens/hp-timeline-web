import { configureStore } from "@reduxjs/toolkit";
import eventSlice from "../component/eventSlice";
import playerSlice from "../component/playerSlice";

export const store = configureStore({
  reducer : {
    event: eventSlice,
    player: playerSlice
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;