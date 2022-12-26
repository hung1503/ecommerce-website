import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../types/user";

const initialState: UserType[] = [];

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    sortName: (state, action: PayloadAction<"asc" | "desc">) => {
      if (action.payload === "asc") {
        state.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        state.sort((a, b) => b.name.localeCompare(a.name));
      }
    },
  },
});

const userReducer = userSlice.reducer;
export default userReducer;
