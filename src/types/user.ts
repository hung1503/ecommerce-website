export interface UserType {
  id: number;
  email: string;
  password: string;
  name: string;
  role: "customer" | "admin";
  avatar: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface UserReducerType {
  user: UserType;
  loginResponse: UserLoginResponse;
}
