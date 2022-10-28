import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

export interface IReduxStore {
  page: number;
}

const initState: IReduxStore = {
  page: 1,
};

export const RSetPage = createAction<number>("RSetPage");

const reducer = createReducer(initState, (builder) => {
  builder.addCase(RSetPage, (state, action) => {
    state.page = action.payload;
  });
});

export default configureStore({ reducer });
