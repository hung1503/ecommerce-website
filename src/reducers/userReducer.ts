import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { UserLogin, UserLoginResponse, UserType } from "../types/user";

export const getFromLocalStorage = (): UserType[] => {
  const user = localStorage.getItem("loggedInUser");
  if (user) {
    return [JSON.parse(user).userInfo];
  } else {
    return [];
  }
};
const initialState: UserType[] = getFromLocalStorage();
export const userLogin = createAsyncThunk(
  "userLogin",
  async (info: UserLogin) => {
    try {
      const response: AxiosResponse<UserLoginResponse, any> = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        info
      );
      const { access_token } = await response.data;
      const userInfo = await axios.get(
        "https://api.escuelajs.co/api/v1/auth/profile",
        {
          headers: {
            Authorization: `bearer ${access_token}`,
          },
        }
      );
      const loggedInUser = {
        userInfo: userInfo.data,
        access_token,
      };
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      return userInfo.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    userLogout: (state) => {
      localStorage.removeItem("loggedInUser");
      state = [];
      return state;
    },
  },
  extraReducers: (build) => {
    build.addCase(userLogin.fulfilled, (state, action) => {
      if (action.payload) {
        state.push(action.payload);
      }
      return state;
    });
    build.addCase(userLogin.rejected, (state, action) => {
      console.log(action.payload);
      return state;
    });
    build.addCase(userLogin.pending, (state, action) => {
      console.log("pending data");
      return state;
    });
  },
});

const userReducer = userSlice.reducer;
export const { userLogout } = userSlice.actions;
export default userReducer;
