import { rest } from "msw";
import { setupServer } from "msw/node";
import { CreateProduct, ProductType } from "../../types/product";

const products = [
  {
    id: 1,
    title: "B",
    price: 491,
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=8827",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=1877",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=312",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=5418",
    ],
  },
  {
    id: 2,
    title: "A",
    price: 455,
    description:
      "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1648",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=9239",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=6060",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=7203",
    ],
  },
  {
    id: 3,
    title: "C",
    price: 10,
    description:
      "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=8827",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=6654",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=7084",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=1396",
    ],
  },
];

const users = [
  {
    id: 1,
    email: "john@mail.com",
    password: "changeme",
    name: "Jhon",
    role: "customer",
    avatar: "https://api.lorem.space/image/face?w=640&h=480&r=6440",
  },
  {
    id: 2,
    email: "maria@mail.com",
    password: "12345",
    name: "Maria",
    role: "customer",
    avatar: "https://api.lorem.space/image/face?w=640&h=480&r=1901",
  },
  {
    id: 3,
    email: "admin@mail.com",
    password: "admin123",
    name: "Admin",
    role: "admin",
    avatar: "https://api.lorem.space/image/face?w=640&h=480&r=7019",
  },
  {
    id: 4,
    email: "john77@mail.com",
    password: "changeme",
    name: "Jhon77",
    role: "customer",
    avatar: "https://api.lorem.space/image/face?w=640&h=480&r=6440",
  },
];

const handler = [
  rest.get("https://api.escuelajs.co/api/v1/products", (req, res, ctx) => {
    return res(ctx.json(products));
  }),
  rest.post(
    "https://api.escuelajs.co/api/v1/products/",
    async (req, res, ctx) => {
      const product: CreateProduct = await req.json();
      return res(ctx.json(product));
    }
  ),
  rest.put(
    `https://api.escuelajs.co/api/v1/products/:id`,
    async (req, res, ctx) => {
      const update: Partial<ProductType> = await req.json();
      const id = req.params.id;
      const foundProduct = products.find(
        (product) => product.id === Number(id)
      );
      if (foundProduct) {
        const updatedProduct = {
          ...foundProduct,
          ...update,
        };
        return res(ctx.json(updatedProduct));
      }
      return res(ctx.status(404, "Data not found"));
    }
  ),
  rest.post(
    "https://api.escuelajs.co/api/v1/files/upload",
    async (req, res, ctx) => {
      const file: File = await req.json();
      return res(
        ctx.json({
          originalname: file.name,
          filename: file.name,
          location: `https://api.escuelajs.co/api/v1/files/${file.name}`,
        })
      );
    }
  ),
  rest.delete(
    "https://api.escuelajs.co/api/v1/products/:id",
    async (req, res, ctx) => {
      const id = req.params.id;
      const foundProduct = products.find(
        (product) => product.id === Number(id)
      );
      if (foundProduct) {
        return res(ctx.json(foundProduct));
      }
      return res(ctx.status(404, "Data not found"));
    }
  ),
  rest.get("https://api.escuelajs.co/api/v1/users", (req, res, ctx) => {
    return res(ctx.json(users));
  }),
];

const server = setupServer(...handler);
export default server;
