import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { fetchAllUsers, userLogin } from "../../reducers/userReducer";
import { createStore, RootState } from "../../redux/store";
import server from "../shared/server";
let store: ToolkitStore<
  RootState,
  AnyAction,
  [ThunkMiddleware<RootState, AnyAction, undefined>]
>;

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

beforeEach(() => {
  store = createStore();
});

describe("Test all action of user reducer", () => {
  test("return all user", async () => {
    await store.dispatch(fetchAllUsers());
    expect(store.getState().user.length).toBe(4);
  });
  test("login sucessfully", async () => {
    const user = {
      email: "admin@mail.com",
      password: "admin123",
    };
    await store.dispatch(userLogin(user));
  });
});
