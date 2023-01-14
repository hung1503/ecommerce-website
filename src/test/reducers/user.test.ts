import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import {
  fetchAllUsers,
  authenticalCredential,
  userUpdate,
  userRegister,
} from "../../redux/reducers/userReducer";
import { createStore, RootState } from "../../redux/store";
import { UserUpdate } from "../../types/user";
import userServer from "../shared/userServer";
let store: ToolkitStore<
  RootState,
  AnyAction,
  [ThunkMiddleware<RootState, AnyAction, undefined>]
>;

beforeAll(() => {
  userServer.listen();
});

afterAll(() => {
  userServer.close();
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
  //   const file: File = {
  //     name: "filename.jpg",
  //     lastModified: 1673257925235,
  //     webkitRelativePath: "",
  //     size: 25233,
  //     type: "image/jpeg",
  //     arrayBuffer: function (): Promise<ArrayBuffer> {
  //       throw new Error("Function not implemented.");
  //     },
  //     slice: function (
  //       start?: number | undefined,
  //       end?: number | undefined,
  //       contentType?: string | undefined
  //     ): Blob {
  //       throw new Error("Function not implemented.");
  //     },
  //     stream: function () {
  //       throw new Error("Function not implemented.");
  //     },
  //     text: function (): Promise<string> {
  //       throw new Error("Function not implemented.");
  //     },
  //   };
  //   const image: FileList = {
  //     0: file,
  //     length: 1,
  //     item: (index: number) => {
  //       return file;
  //     },
  //     [Symbol.iterator]: function (): IterableIterator<File> {
  //       throw new Error("Function not implemented.");
  //     },
  //   };
  //   const newUser = {
  //     image,
  //     user: {
  //       name: "new",
  //       email: "new@mail.com",
  //       password: "new123",
  //     },
  //   };
  //   await store.dispatch(userRegister(newUser));
  //   const currentUser = store.getState().user.userList;
  //   expect(currentUser.length).toBe(1);
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
