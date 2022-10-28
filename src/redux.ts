import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

export interface IReduxStore {
  page: number;
  homeType: number;
}

const initState: IReduxStore = {
  page: 1,
  homeType: 0,
};

export const RSetPage = createAction<number>("RSetPage");
export const RSetHomeType = createAction<number>("RSetHomeType");

const reducer = createReducer(initState, (builder) => {
  builder
    .addCase(RSetPage, (state, action) => {
      state.page = action.payload;
    })
    .addCase(RSetHomeType, (state, action) => {
      state.homeType = action.payload;
    });
});

export default configureStore({ reducer });
