import { create } from 'zustand';

export const useSearchHistoryStore: any = create((set: any) => ({
  songsHistory: [],
  albumsHistory: [],
  artistsHistory: [],
  playlistsHistory: [],
  setSongsHistory: (param: any) => {
    set((state: any) => ({
      songsHistory: state.songsHistory.concat(param),
    }));
  },
  setAlbumsHistory: (param: any) => {
    set((state: any) => ({
      albumsHistory: state.albumsHistory.concat(param),
    }));
  },
  setArtistsHistory: (param: any) => {
    set((state: any) => ({
      artistsHistory: [...state.artistsHistory.concat(param)],
    }));
  },
  setPlaylistsHistory: (param: any) => {
    set((state: any) => ({
      playlistsHistory: [...state.playlistsHistory.concat(param)],
    }));
  },
  resetSongsHistory: () => set({ songsHistory: [] }),
  resetAlbumsHistory: () => set({ albumsHistory: [] }),
  resetArtistsHistory: () => set({ artistsHistory: [] }),
  resetPlaylistsHistory: () => set({ playlistsHistory: [] }),
  resetAllSearchHistory: () =>
    set({
      songsHistory: [],
      albumsHistory: [],
      artistsHistory: [],
      playlistsHistory: [],
    }),
}));
