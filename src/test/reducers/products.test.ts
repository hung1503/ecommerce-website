import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import {
  createProduct,
  createProductWithForm,
  fetchAllProducts,
  removeProduct,
  sortName,
  sortPrice,
  updateProduct,
} from "../../reducers/productReducer";
import { createStore, RootState } from "../../redux/store";
import { CreateProduct, ProductType } from "../../types/product";
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

describe("Test all action of products reducer", () => {
  test("return inital state", () => {
    expect(store.getState().products.length).toBe(0);
  });
  test("fetching products", async () => {
    await store.dispatch(fetchAllProducts());
    expect(store.getState().products.length).toBe(3);
  });
  test("create product", async () => {
    await store.dispatch(fetchAllProducts());
    const newProduct: CreateProduct = {
      title: "test",
      price: 100,
      description: "test",
      categoryId: 1,
      images: [],
    };
    await store.dispatch(createProduct(newProduct));
    expect(store.getState().products.length).toBe(4);
  });
  test("sort by name asc", async () => {
    await store.dispatch(fetchAllProducts());
    store.dispatch(sortName("asc"));
    expect(store.getState().products[0].title).toBe("A");
    expect(store.getState().products[1].title).toBe("B");
    expect(store.getState().products[2].title).toBe("C");
  });
  test("sort by name desc", async () => {
    await store.dispatch(fetchAllProducts());
    store.dispatch(sortName("desc"));
    expect(store.getState().products[0].title).toBe("C");
    expect(store.getState().products[1].title).toBe("B");
    expect(store.getState().products[2].title).toBe("A");
  });
  test("sort by price asc", async () => {
    await store.dispatch(fetchAllProducts());
    store.dispatch(sortPrice("asc"));
    expect(store.getState().products[0].price).toBe(10);
    expect(store.getState().products[1].price).toBe(455);
    expect(store.getState().products[2].price).toBe(491);
  });
  test("sort by price desc", async () => {
    await store.dispatch(fetchAllProducts());
    store.dispatch(sortPrice("desc"));
    expect(store.getState().products[0].price).toBe(491);
    expect(store.getState().products[1].price).toBe(455);
    expect(store.getState().products[2].price).toBe(10);
  });
  test("update a product", async () => {
    await store.dispatch(fetchAllProducts());
    const updatedProduct = {
      id: 1,
      update: {
        title: "test",
        price: 1503,
      },
    };
    await store.dispatch(updateProduct(updatedProduct));
    expect(store.getState().products.find((p) => p.id === 1)?.title).toBe(
      "test"
    );
    expect(store.getState().products.find((p) => p.id === 1)?.price).toBe(1503);
  });
  test("create product with form", async () => {
    const images: File[] = [
      {
        lastModified: 0,
        name: "test-file",
        webkitRelativePath: "",
        size: 0,
        type: "",
        arrayBuffer: function (): Promise<ArrayBuffer> {
          throw new Error("Function not implemented.");
        },
        slice: function (
          start?: number | undefined,
          end?: number | undefined,
          contentType?: string | undefined
        ): Blob {
          throw new Error("Function not implemented.");
        },
        stream: function () {
          throw new Error("Function not implemented.");
        },
        text: function (): Promise<string> {
          throw new Error("Function not implemented.");
        },
      },
      {
        lastModified: 0,
        name: "test-file2",
        webkitRelativePath: "",
        size: 0,
        type: "",
        arrayBuffer: function (): Promise<ArrayBuffer> {
          throw new Error("Function not implemented.");
        },
        slice: function (
          start?: number | undefined,
          end?: number | undefined,
          contentType?: string | undefined
        ): Blob {
          throw new Error("Function not implemented.");
        },
        stream: function () {
          throw new Error("Function not implemented.");
        },
        text: function (): Promise<string> {
          throw new Error("Function not implemented.");
        },
      },
    ];
    const product: CreateProduct = {
      title: "test",
      price: 100,
      description: "test",
      categoryId: 1,
      images: [],
    };
    await store.dispatch(createProductWithForm({ images, product }));
    expect(store.getState().products.length).toBe(1);
    expect(store.getState().products[0].images.length).toBe(2);
  });
  test("delete a product", async () => {
    await store.dispatch(fetchAllProducts());
    await store.dispatch(removeProduct(1));
    expect(store.getState().products.length).toBe(2);
  });
});
