import { User } from "./UserAPI";
import { api } from "./index";

export type Post = {
  _id: string;
  title: string;
  content: string;
  image: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  user: User;
};

export class PostAPI {
  static async getAll(): Promise<Post[]> {
    const res = await api.get("/posts");
    return res.data;
  }

  static async getOne(id: string): Promise<Post> {
    const res = await api.get(`/posts/${id}`);
    return res.data;
  }

  // TODO:引数の型修正
  static async create(data: object): Promise<Post> {
    const res = await api.post("/posts", data);
    return res.data;
  }
}
