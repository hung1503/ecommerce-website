import cartReducer, {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../redux/reducers/cartReducer";

beforeEach(() => {
  localStorage.setItem(
    "cart",
    JSON.stringify([
      {
        product: {
          id: 1,
          title: "test",
          price: 10,
          description: "test",
          category: {
            id: 1,
            name: "Clothes",
            image: "https://api.lorem.space/image/fashion?w=640&h=480&r=6834",
          },
          images: [],
        },
        quantity: 3,
        totalPrice: 10,
      },
    ])
  );
});

afterEach(() => {
  localStorage.clear();
});

describe("Test action of cart reducer", () => {
  test("add to cart", () => {
    const cart = cartReducer(
      [],
      addToCart({
        product: {
          id: 2,
          title: "test",
          price: 10,
          description: "test",
          category: {
            id: 1,
            name: "Clothes",
            image: "https://api.lorem.space/image/fashion?w=640&h=480&r=6834",
          },
          images: [],
        },
        quantity: 1,
        totalPrice: 10,
      })
    );
    expect(cart.length).toBe(2);
  });
  test("remove from cart", () => {
    const cart = cartReducer(
      [],
      removeFromCart({
        product: {
          id: 1,
          title: "test",
          price: 10,
          description: "test",
          category: {
            id: 1,
            name: "Clothes",
            image: "https://api.lorem.space/image/fashion?w=640&h=480&r=6834",
          },
          images: [],
        },
        quantity: 3,
        totalPrice: 10,
      })
    );
    expect(cart.length).toBe(0);
  });
  test("increase quantity", () => {
    const cart = cartReducer(
      [],
      increaseQuantity({
        product: {
          id: 1,
          title: "test",
          price: 10,
          description: "test",
          category: {
            id: 1,
            name: "Clothes",
            image: "https://api.lorem.space/image/fashion?w=640&h=480&r=6834",
          },
          images: [],
        },
        quantity: 1,
        totalPrice: 10,
      })
    );
    expect(cart[0].quantity).toBe(4);
  });
  test("decrease quantity", () => {
    const cart = cartReducer(
      [],
      decreaseQuantity({
        product: {
          id: 1,
          title: "test",
          price: 10,
          description: "test",
          category: {
            id: 1,
            name: "Clothes",
            image: "https://api.lorem.space/image/fashion?w=640&h=480&r=6834",
          },
          images: [],
        },
        quantity: 1,
        totalPrice: 10,
      })
    );
    expect(cart[0].quantity).toBe(2);
  });
});
