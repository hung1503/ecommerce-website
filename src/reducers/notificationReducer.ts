import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState: {
    message: "",
    type: "",
  },
  reducers: {},
});

const notificationReducer = notificationSlice.reducer;
export default notificationReducer;
