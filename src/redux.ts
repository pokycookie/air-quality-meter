import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";
import { ICoord } from "./types";

export interface IReduxStore {
  page: number;
  homeType: number;
  windowSize: ICoord;
}

const initState: IReduxStore = {
  page: 1,
  homeType: 0,
  windowSize: { x: 0, y: 0 },
};

export const RSetPage = createAction<number>("RSetPage");
export const RSetHomeType = createAction<number>("RSetHomeType");
export const RSetWindowSize = createAction<ICoord>("RSetWindowSize");

const reducer = createReducer(initState, (builder) => {
  builder
    .addCase(RSetPage, (state, action) => {
      state.page = action.payload;
    })
    .addCase(RSetHomeType, (state, action) => {
      state.homeType = action.payload;
    })
    .addCase(RSetWindowSize, (state, action) => {
      state.windowSize = action.payload;
    });
});

export default configureStore({ reducer });
