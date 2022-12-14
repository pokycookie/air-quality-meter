import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";
import { ICoord, IModal } from "./types";

export interface IReduxStore {
  page: number;
  homeType: number;
  windowSize: ICoord;
  modal: IModal;
}

const initState: IReduxStore = {
  page: 0,
  homeType: 0,
  windowSize: { x: 0, y: 0 },
  modal: { content: null },
};

export const RSetPage = createAction<number>("RSetPage");
export const RSetHomeType = createAction<number>("RSetHomeType");
export const RSetWindowSize = createAction<ICoord>("RSetWindowSize");
export const RSetModal = createAction<IModal>("RSetModal");

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
    })
    .addCase(RSetModal, (state, action) => {
      state.modal = action.payload;
    });
});

export default configureStore({
  reducer,
  middleware: (getDefault) => getDefault({ serializableCheck: false }),
});
