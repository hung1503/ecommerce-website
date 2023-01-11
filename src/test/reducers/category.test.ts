import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { fetchAllCategories } from "../../redux/reducers/categoryReducer";
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

describe("Test category reducer", () => {
  test("return initial state", () => {
    expect(store.getState().categories.length).toBe(0);
  });

  test("fetching products", async () => {
    await store.dispatch(fetchAllCategories());
    expect(store.getState().categories.length).toBe(3);
  });
});
