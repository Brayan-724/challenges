import { GetState, SetState } from "zustand";
import { Store } from ".";
import { IPhoto } from "../../server/orm/models/Photo";

export interface PhotosState {
  photos: IPhoto[];
  loading: boolean;
  loadedPages: number[];
}

export interface PhotosStore extends PhotosState {
  setPhotos: (photos: IPhoto[]) => void;
  addPhoto: (photo: IPhoto) => void;
  removePhoto: (id: string) => void;

  loadPhotosPerPage: (page: number) => Promise<void>;
}

export const initialPhotosState: PhotosState = {
  photos: [],
  loading: false,
  loadedPages: [],
};

export const photosStore = (set: SetState<Store>, get: GetState<Store>) => ({
  photos: {
    ...initialPhotosState,
    setPhotos: (photos: IPhoto[]) =>
      set((state) => ({ ...state, photos: { ...state.photos, photos } })),
    addPhoto: (photo: IPhoto) =>
      set((state) => ({
        ...state,
        photos: { ...state.photos, photos: [...state.photos.photos, photo] },
      })),
    removePhoto: (id: string) =>
      set((state) => ({
        ...state,
        photos: {
          ...state.photos,
          photos: state.photos.photos.filter((photo) => photo.photo_id !== id),
        },
      })),
    loadPhotosPerPage: (page: number) => loadPhotosPerPage(page, set, get),
  } as PhotosStore,
});

async function loadPhotosPerPage(
  page: number,
  set: SetState<Store>,
  get: GetState<Store>
) {
  if (get().photos.loadedPages.includes(page)) return;
  set((state) => ({ ...state, loading: true }));

  const photos = await getDataPerPage(page);

  set((state) => ({
    ...state,
    photos: {
      ...state.photos,
      loadedPages: [...state.photos.loadedPages, page].filter(
        (x, i, a) => a.indexOf(x) === i
      ),
      photos: [...state.photos.photos, ...photos],
    },
  }));
}

interface PhotoFetched {
  id: number;
  author: string;
  width: number;
  height: number;
  download_url: string;
}

export async function getDataPerPage(page: number): Promise<IPhoto[]> {
  const photos = await fetch(
    `https://picsum.photos/v2/list?page=${page}&limit=5`
  ).then((res) => res.json());

  return photos.map((photo: PhotoFetched) => ({
    id: photo.id,
    title: `Photo ${photo.id} of ${photo.author}`,
    url: photo.download_url.split("/").slice(0, -2).join("/") + "/600/600",
  }));
}
