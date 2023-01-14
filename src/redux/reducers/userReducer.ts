import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../../common/axiosInstance";
import {
  CreateUserWithFile,
  UserInitialState,
  UserLogin,
  UserLoginResponse,
  UserType,
  UserUpdate,
} from "../../types/user";

const getFromLocalStorage = () => {
  const userSession = localStorage.getItem("loggedInUser");
  if (userSession) {
    return JSON.parse(userSession).currentUser;
  } else {
    return undefined;
  }
};

const initialState: UserInitialState = {
  userList: [],
  currentUser: getFromLocalStorage(),
};

export const fetchAllUsers = createAsyncThunk("fetchAllUsers", async () => {
  try {
    const response = await axiosInstance.get("/users");
    const data = await response.data;
    return data;
  } catch (error: any) {
    const err = error as AxiosError;
    return err;
  }
});

export const authenticalCredential = createAsyncThunk(
  "authenticalCredential",
  async ({ email, password }: UserLogin, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      const data: UserLoginResponse = response.data;
      const result = await thunkAPI.dispatch(loginUser(data.access_token));
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          access_token: data.access_token,
          currentUser: result.payload,
        })
      );
      return result.payload as UserType;
    } catch (e: any) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async (access_token: string) => {
    try {
      const response = await axiosInstance.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const data: UserType = response.data;
      return data;
    } catch (e: any) {
      const error = e as AxiosError;
      return error;
    }
  }
);
export const userRegister = createAsyncThunk(
  "userRegister",
  async ({ image, user }: CreateUserWithFile) => {
    try {
      const resImg = await axiosInstance.post(
        "/files/upload",
        { file: image && image[0] },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const img = await resImg.data.location;
      const response: AxiosResponse<UserType, any> = await axiosInstance.post(
        "/users/",
        { ...user, avatar: img }
      );
      const data = await response.data;
      return data;
    } catch (error: any) {
      const err = error as AxiosError;
      return err;
    }
  }
);

export const userUpdate = createAsyncThunk(
  "userUpdate",
  async ({ id, update }: UserUpdate) => {
    try {
      const response = await axiosInstance.put(`/users/${id}`, update);
      const data = await response.data;
      return data;
    } catch (error: any) {
      const err = error as AxiosError;
      return err;
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    userLogout: (state) => {
      localStorage.removeItem("loggedInUser");
      state.currentUser = undefined;
      return state;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          return state;
        }
        state.userList = action.payload;
      })
      .addCase(authenticalCredential.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          return state;
        }
        state.currentUser = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          return state;
        }
        state.currentUser = action.payload;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          return state;
        }
        state.userList.push(action.payload);
        return state;
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          return state;
        }
        const users = state.userList.map((user) => {
          if (user.id === action.payload.id) {
            return action.payload;
          }
          return user;
        });
        state.userList = users;
      });
  },
});

const userReducer = userSlice.reducer;
export const { userLogout } = userSlice.actions;
export default userReducer;
