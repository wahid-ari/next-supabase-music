import { create } from 'zustand';

export const useSearchHistoryStore = create((set) => ({
  songsHistory: [],
  albumsHistory: [],
  artistssHistory: [],
  playlistssHistory: [],
  setSongsHistory: (param) => {
    set({ songsHistory: param })
  },
  setAlbumsHistory: (param) => {
    set({ albumsHistory: param })
  },
  setArtistsHistory: (param) => {
    set({ artistsHistory: param })
  },
  setPlaylistsHistory: (param) => {
    set({ playlistsHistory: param })
  },
  resetSongsHistory: () => set({ songsHistory: [] }),
  resetAlbumsHistory: () => set({ albumsHistory: [] }),
  resetArtistsHistory: () => set({ artistsHistory: [] }),
  resetPlaylistsHistory: () => set({ playlistsHistory: [] }),
  resetAllSearchHistory: () => set({
    songssHistory: [],
    albumsHistory: [],
    artistsHistory: [],
    playlistsHistory: []
  }),
}))