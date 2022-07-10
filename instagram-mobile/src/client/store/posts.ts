import { GetState, SetState } from "zustand";
import { Store } from ".";
import { IPost } from "../../server/orm/models/Post";
import { INewPost } from "../../server/routes/api/posts";

export interface PostsState {
  posts: IPost[];
  loading: boolean;
}

export interface PostsStore extends PostsState {
  newPost: (post: INewPost) => Promise<null | Error>;
  fetchPosts: () => Promise<void>;
  deletePost: (id: IPost["post_id"]) => Promise<null | Error>;
  updatePost: (post: IPost) => Promise<null | Error>;
}

export const postsInitialState: PostsState = {
  posts: [],
  loading: false,
};

export const postsStore = (set: SetState<Store>, get: GetState<Store>) => ({
  posts: {
    ...postsInitialState,

    newPost: async (post: INewPost) => {
      try {
        set((state) => ({
          ...state,
          posts: {
            ...state.posts,
            loading: true,
          },
        }));
        const response = await fetch("/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(post),
        });

        set((state) => ({
          ...state,
          posts: {
            ...state.posts,
            loading: false,
          },
        }));

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return null;
      } catch (error) {
        set((state) => ({
          ...state,
          posts: {
            ...state.posts,
            loading: false,
          },
        }));

        return error;
      }
    },

    fetchPosts: async () => {
      const response = await fetch("/api/posts");
      const posts = await response.json();
      set((state) => ({
        ...state,
        posts: {
          ...state.posts,
          posts,
        },
      }));
    },

    deletePost: async (id: IPost["post_id"]) => {
      return null;
    },

    updatePost: async (post: IPost) => {
      return null;
    },
  } as PostsStore,
});
