import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axiosInstance from "../common/axiosInstance";
import {
  CreateUserWithFile,
  UserLogin,
  UserLoginResponse,
  UserType,
} from "../types/user";

export const getFromLocalStorage = (): UserType[] => {
  const user = localStorage.getItem("loggedInUser");
  if (user) {
    return [JSON.parse(user).userInfo];
  } else {
    return [];
  }
};
const initialState: UserType[] = getFromLocalStorage();

export const fetchAllUsers = createAsyncThunk("fetchAllUsers", async () => {
  try {
    const response = await axiosInstance.get("/users");
    const data: UserType[] | Error = await response.data;
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
});

export const userLogin = createAsyncThunk(
  "userLogin",
  async (info: UserLogin) => {
    try {
      const response: AxiosResponse<UserLoginResponse, any> =
        await axiosInstance.post("/auth/login", info);
      const { access_token } = await response.data;
      const userInfo = await axiosInstance.get("/auth/profile", {
        headers: {
          Authorization: `bearer ${access_token}`,
        },
      });
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

export const userRegister = createAsyncThunk(
  "userRegister",
  async ({ image, user }: CreateUserWithFile) => {
    try {
      const resImg = await axiosInstance.post("/files/upload", image);
      const img = await resImg.data.location;
      const response: AxiosResponse<UserType, any> = await axiosInstance.post(
        "/users/",
        { ...user, avatar: img }
      );
      const data = await response.data;
      return data;
    } catch (error: any) {
      console.log(error.message);
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
    build
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        if ("message" in action.payload && action.payload) {
          return state;
        } else if (!action.payload) {
          return state;
        } else {
          return action.payload;
        }
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        console.log("error in fetching data");
        return state;
      })
      .addCase(fetchAllUsers.pending, (state, action) => {
        // console.log("fetching all users data");
        return state;
      });
    build
      .addCase(userLogin.fulfilled, (state, action) => {
        if (action.payload) {
          state.push(action.payload);
        }
        return state;
      })
      .addCase(userLogin.rejected, (state, action) => {
        console.log(action.payload);
        return state;
      })
      .addCase(userLogin.pending, (state, action) => {
        console.log("loging in");
        return state;
      });
    build
      .addCase(userRegister.fulfilled, (state, action) => {
        if (action.payload) {
          state.push(action.payload);
        }
        return state;
      })
      .addCase(userRegister.rejected, (state, action) => {
        console.log(action.payload);
        return state;
      })
      .addCase(userRegister.pending, (state, action) => {
        console.log("creating data");
        return state;
      });
  },
});

const userReducer = userSlice.reducer;
export const { userLogout } = userSlice.actions;
export default userReducer;
