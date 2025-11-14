import api from "./client";
import { User } from "@/types/user";

export async function fetchUsers(): Promise<User[]> {
  const response = await api.get<User[]>("/users");
  return response.data;
}

export const createUser = async (user: Partial<User>) => {
  const { data } = await api.post('/users', user);
  return data;
};