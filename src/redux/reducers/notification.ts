import { createSlice } from "@reduxjs/toolkit";
import { NotificationType } from "../../types/notification";

const initialState: NotificationType[] = [];

const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState: initialState,
  reducers: {
    displayNoti: (state, action) => {
      state.push({
        message: action.payload.message,
        type: action.payload.type,
      });
    },
  },
  extraReducers: {},
});

const notificationReducer = notificationSlice.reducer;
export const { displayNoti } = notificationSlice.actions;
export default notificationReducer;
