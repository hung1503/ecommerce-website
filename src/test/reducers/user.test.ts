import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import {
  fetchAllUsers,
  authenticalCredential,
  userUpdate,
} from "../../redux/reducers/userReducer";
import { createStore, RootState } from "../../redux/store";
import { UserUpdate } from "../../types/user";
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
    expect(store.getState().user.userList.length).toBe(4);
  });
  test("login sucessfully", async () => {
    const user = {
      email: "admin@mail.com",
      password: "admin123",
    };
    await store.dispatch(authenticalCredential(user));
    const currentUser = store.getState().user.currentUser;
    expect(currentUser).toBeDefined();
  });
  // test("register succesfully", async () => {
  //   const image: FileList = {
  //     0: new File([""], "filename", { type: "image/png" }),
  //     length: 1,
  //     item: (index: number) => {
  //       return new File([""], "filename", { type: "image/png" });
  //     },
  //     [Symbol.iterator]: function (): IterableIterator<File> {
  //       throw new Error("Function not implemented.");
  //     },
  //   };
  // });
  test("update user", async () => {
    await store.dispatch(fetchAllUsers());
    const updatedUser: UserUpdate = {
      id: 1,
      update: {
        email: "new@mail.com",
        name: "new",
      },
    };
    await store.dispatch(userUpdate(updatedUser));
    const currentUser = store.getState().user.userList;
    expect(currentUser[0].name).toBe("new");
    expect(currentUser[0].email).toBe("new@mail.com");
  });
});
