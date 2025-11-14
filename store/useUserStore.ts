import {create} from "zustand";
import axios from "axios";
import type {Post, User} from "@/types/user";
import { devtools } from "zustand/middleware";

interface UserState {
  users: User[];
  posts: Post[];
  loadingFetchUser: boolean;
  loadingCreateUser: boolean;
  loadingUpdateUser: boolean;
  loadingDeleteUser: boolean;
  loadingFetchPost: boolean;
  errorFetchUser : string | null;
  errorCreateUser : string | null;
  errorUpdateUser : string | null;
  errorDeleteUser : string | null;
  errorFetchPost : string | null;


fetchUsers: () => Promise<void>;
createUser: (user: Omit<User, 'id'>) => Promise<void>;
updateUser: (id: number, updates: Partial<User>) => Promise<void>;
deleteUser: (id: number) => Promise<void>;
fetchPosts: (userId: string) => Promise<void>;
}

const BASE_URL= 'https://jsonplaceholder.typicode.com'


export const useUserStore = create<UserState>()(
devtools((set) => ({
    users: [],
    posts: [],
    loadingFetchUser: false,
    loadingCreateUser: false,
    loadingUpdateUser: false,
    loadingDeleteUser: false,
    loadingFetchPost: false,
    errorFetchUser: null,
    errorCreateUser: null,
    errorUpdateUser: null,
    errorDeleteUser: null,
    errorFetchPost: null,

fetchUsers: async () => {
    set({ loadingFetchUser: true, errorFetchUser: null });
    try {
      const { data } = await axios.get<User[]>(BASE_URL + '/users');
      set({ users: data, loadingFetchUser: false });
    } catch (err: Error | unknown) {
      set({ errorFetchUser: (err as Error).message || 'Failed to fetch users', loadingFetchUser: false });
    }
  },

  createUser: async (user) => {
    set({ loadingCreateUser: true, errorCreateUser: null });
    try {
      const { data } = await axios.post<User>(BASE_URL + '/users', user);
      set((state) => ({
        users: [...state.users, data],
        loadingCreateUser: false,
      }));
    } catch (err: Error | unknown) {
      set({ errorCreateUser: (err as Error).message || 'Failed to create user', loadingCreateUser: false });
    }
  },

  updateUser: async (id, updates) => {
    set({ loadingUpdateUser: true, errorUpdateUser: null });
    try {
      const { data } = await axios.put<User>(BASE_URL + `/users/${id}`, updates);
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? data : u)),
        loadingUpdateUser: false,
      }));
    } catch (err: Error | unknown) {
      set({ errorUpdateUser: (err as Error).message || 'Failed to update user', loadingUpdateUser: false });
    }
  },

  deleteUser: async (id) => {
    set({ loadingDeleteUser: true, errorDeleteUser: null });
    try {
      await axios.delete(`/users`, {
        data: {
          user: id,
        },
      });
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
        loadingDeleteUser: false,
      }));
    } catch (err: Error | unknown) {
      set({ errorDeleteUser: (err as Error).message || 'Failed to delete user', loadingDeleteUser: false });
    }
  },

  fetchPosts: async (userId) => {
        set({ loadingFetchPost: true, errorFetchPost: null });
    try {
      const { data } = await axios.get<Post[]>(BASE_URL + `/users/${userId}/posts`);
      set({ posts: data, loadingFetchPost: false });
    } catch (err: Error | unknown) {
      set({ errorFetchPost: (err as Error).message || 'Failed to fetch user`s post', loadingFetchPost: false });
    }
  },
})))