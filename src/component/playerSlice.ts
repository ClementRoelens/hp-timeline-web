import { PayloadAction } from './../../node_modules/@reduxjs/toolkit/src/createAction';
import { createSlice } from "@reduxjs/toolkit";
import { Player } from "../models/Player";
import { RootState } from "../config/store";
import { Event } from '../models/Event';

const initialState = {
  currentPlayerIndex: 0,
  players: []
} as {
  currentPlayerIndex: number,
  players: Player[]
};

const playerSlice = createSlice({
  name: "player",
  initialState: initialState,
  reducers: {
    initiatePlayers: (state, action: PayloadAction<Player[]>) => {
      state.players = action.payload;
    },
    addCardToHand: (state, action: PayloadAction<{ index: number, event: Event }>) => {
      state.players[action.payload.index].hand.push(action.payload.event);
    },
    endTurn: (state) => {
      if (state.currentPlayerIndex + 1 < state.players.length) {
        state.currentPlayerIndex = state.currentPlayerIndex + 1
      } else {
        state.currentPlayerIndex = 0;
      }
    }

  }
});

export const { initiatePlayers, addCardToHand, endTurn } = playerSlice.actions;
export default playerSlice.reducer;
export const playerSelector = (state: RootState) => state.player;