import { rest } from "msw";
import { setupServer } from "msw/node";
import jwt from "jsonwebtoken";
import { UserType } from "../../types/user";

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
  rest.get("https://api.escuelajs.co/api/v1/users", (req, res, ctx) => {
    return res(ctx.json(users));
  }),
  rest.post(
    "https://api.escuelajs.co/api/v1/auth/login",
    async (req, res, ctx) => {
      const { email, password } = await req.json();
      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );
      if (foundUser) {
        const access_token = jwt.sign(foundUser, "anykey");
        return res(ctx.json({ access_token }));
      } else {
        return res(ctx.status(401, "Unauthorize"));
      }
    }
  ),
  rest.get("https://api.escuelajs.co/api/v1/auth/profile", (req, res, ctx) => {
    const access_tokenArr = req.headers.get("authorization")?.split(" ");
    try {
      if (access_tokenArr) {
        const access_token = access_tokenArr[1];
        const foundUser = jwt.verify(access_token, "anykey");
        return res(ctx.json({ foundUser }));
      } else {
        return res(ctx.status(401, "Unauthorize"));
      }
    } catch (e: any) {
      console.log(e);
      return res(ctx.json(e));
    }
  }),
  rest.put(
    "https://api.escuelajs.co/api/v1/users/:id",
    async (req, res, ctx) => {
      const id = req.params.id;
      const update: Partial<UserType> = await req.json();
      const foundUser = users.find((user) => user.id === Number(id));
      if (foundUser) {
        const updatedUser = {
          ...foundUser,
          ...update,
        };
        return res(ctx.json(updatedUser));
      }
      return res(ctx.status(404, "Data not found"));
    }
  ),
];

const userServer = setupServer(...handler);
export default userServer;
