import { Post } from "./PostAPI";
import { api } from "./index";

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "viewer" | "contributor" | "admin";
  posts: Post[];
};

export const findAll = async (): Promise<User[]> => {
  const res = await api.get("/users");
  return res.data;
}

export const findOne = async (id: string): Promise<User> => {
  const res = await api.get(`/users/${id}`);
  return res.data;
}

// TODO:引数の型修正
export const signUp = async (data: object): Promise<{ user: User; token: string }> => {
  const res = await api.post("/users/sign-up", data);
  return res.data;
}

export const signIn = async (data: object): Promise<{ user: User; token: string }> => {
  const res = await api.post("/users/sign-in", data);
  return res.data;
}

export const verifyToken = async (): Promise<User | null> => {
  const res = await api.post("/users/verify-token");
  return res.data;
}
