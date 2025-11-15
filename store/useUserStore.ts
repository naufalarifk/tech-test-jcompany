import {create} from "zustand";
import axios from "axios";
import type {Post, User} from "@/types/user";

interface UserState {
  users: User[];

  loadingFetchUser: boolean;
  loadingCreateUser: boolean;
  loadingUpdateUser: boolean;
  loadingDeleteUser: boolean;
  successFetchUser: boolean;
  successCreateUser: boolean;
  successUpdateUser: boolean;
  successDeleteUser: boolean;
  errorFetchUser : string | null;
  errorCreateUser : string | null;
  errorUpdateUser : string | null;
  errorDeleteUser : string | null;


fetchUsers: () => Promise<void>;
createUser: (user: Omit<User, 'id'>) => Promise<void>;
updateUser: (id: number, updates: Partial<User>) => Promise<void>;
deleteUser: (id: number) => Promise<void>;
}

interface PostState {
  posts: Post[];
  loadingFetchPost: boolean;
  successFetchPost: boolean;
  errorFetchPost: string | null;
  fetchPosts: (userId: string) => Promise<void>;
}


const BASE_URL= 'https://jsonplaceholder.typicode.com'


const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});



export const useUserStore = create<UserState>()((set) => ({
  users: [],
  loadingFetchUser: false,
  successFetchUser: false,
  errorFetchUser: null,
  loadingCreateUser: false,
  loadingUpdateUser: false,
  loadingDeleteUser: false,
  successCreateUser: false,
  successUpdateUser: false,
  successDeleteUser: false,
  errorCreateUser: null,
  errorUpdateUser: null,
  errorDeleteUser: null,

  fetchUsers: async () => {
    set({ loadingFetchUser: true, errorFetchUser: null });
    try {
      const { data } = await api.get<User[]>('/users');
      set({ users: data, loadingFetchUser: false, successFetchUser: true });
    } catch (err) {
      set({ 
        errorFetchUser: (err as Error).message || 'Failed to fetch users', 
        loadingFetchUser: false 
      });
    }
  },

  createUser: async (user) => {
    set({ loadingCreateUser: true, errorCreateUser: null });
    try {
      const { data } = await api.post<User>('/users', user);
      set((state) => ({
        users: [...state.users, data],
        loadingCreateUser: false,
        successCreateUser: true
      }));
    } catch (err) {
      set({ 
        errorCreateUser: (err as Error).message || 'Failed to create user', 
        loadingCreateUser: false 
      });
    }
  },

  updateUser: async (id, updates) => {
    set({ loadingUpdateUser: true, errorUpdateUser: null });
    try {
      const { data } = await api.put<User>(`/users/${id}`, updates);
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? data : u)),
        loadingUpdateUser: false,
        successUpdateUser: true
      }));
    } catch (err) {
      set({ 
        errorUpdateUser: (err as Error).message || 'Failed to update user', 
        loadingUpdateUser: false 
      });
    }
  },

  deleteUser: async (id) => {
    set({ loadingDeleteUser: true, errorDeleteUser: null });
    try {
      await api.delete(`/users/${id}`);
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
        loadingDeleteUser: false,
        successDeleteUser: true
      }));
    } catch (err) {
      set({ 
        errorDeleteUser: (err as Error).message || 'Failed to delete user', 
        loadingDeleteUser: false 
      });
    }
  },
}));

export const usePostStore = create<PostState>()((set) => ({
  posts: [],
  loadingFetchPost: false,
  successFetchPost: false,
  errorFetchPost: null,

  fetchPosts: async (userId) => {
    set({ loadingFetchPost: true, errorFetchPost: null });
    try {
      const { data } = await api.get<Post[]>(`/users/${userId}/posts`);
      set({ posts: data, loadingFetchPost: false, successFetchPost: true });
    } catch (err) {
      set({ 
        errorFetchPost: (err as Error).message || 'Failed to fetch posts', 
        loadingFetchPost: false 
      });
    }
  },
}));

export const useUsers = () => useUserStore((state) => state.users);

export const useLoadingFetchUser = () => useUserStore((state) => state.loadingFetchUser);
export const useSuccessFetchUser = () => useUserStore((state) => state.successFetchUser);
export const useErrorFetchUser = () => useUserStore((state) => state.errorFetchUser);


export const useLoadingCreateUser = () => useUserStore((state) => state.loadingCreateUser);
export const useSuccessCreateUser = () => useUserStore((state) => state.successCreateUser);
export const useErrorCreateUser = () => useUserStore((state) => state.errorCreateUser);

export const useLoadingUpdateUser = () => useUserStore((state) => state.loadingUpdateUser);
export const useSuccessUpdateUser = () => useUserStore((state) => state.successUpdateUser);
export const useErrorUpdateUser = () => useUserStore((state) => state.errorUpdateUser);

export const useLoadingDeleteUser = () => useUserStore((state) => state.loadingDeleteUser);
export const useSuccessDeleteUser = () => useUserStore((state) => state.successDeleteUser);
export const useErrorDeleteUser = () => useUserStore((state) => state.errorDeleteUser);


export const usePosts = () => usePostStore((state) => state.posts);
export const useLoadingFetchPosts = () => usePostStore((state) => state.loadingFetchPost);
export const useSuccessFetchPosts = () => usePostStore((state) => state.successFetchPost);
export const useErrorFetchPosts = () => usePostStore((state) => state.errorFetchPost);