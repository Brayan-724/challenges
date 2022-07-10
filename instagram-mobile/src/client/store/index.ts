import { useLayoutEffect } from "react";
import create, { GetState, SetState, UseBoundStore } from "zustand";
import createContext from "zustand/context";
import { initialPhotosState, PhotosState, photosStore, PhotosStore } from "./photos";
import { postsStore, PostsStore } from "./posts";

let store: UseBoundStore<Store> | undefined = undefined;

export interface Store {
  photos: PhotosStore;
  posts: PostsStore;
};

const zustandContext = createContext<Store>();
export const Provider = zustandContext.Provider;
export const useStore = zustandContext.useStore;

export const initializeStore = (pre = {}) => {
  return create<Store>((set: SetState<Store>, get: GetState<Store>) => ({
    ...pre,
    ...photosStore(set, get),
    ...postsStore(set, get)
  }));
};

export function useCreateStore(initialState: Store) {
  // For SSR & SSG, always use a new store.
  if (typeof window === "undefined") {
    return () => initializeStore(initialState);
  }

  // For CSR, always re-use same store.
  store = store ?? initializeStore(initialState);

  useLayoutEffect(() => {
    if (initialState && store) {
      store.setState({
        ...store.getState(),
        ...initialState,
      });
    }
  }, [initialState]);

  return () => store;
}
