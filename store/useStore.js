import { create } from 'zustand';

export const useSearchHistoryStore = create((set) => ({
  songsHistory: [],
  albumsHistory: [],
  artistsHistory: [],
  playlistsHistory: [],
  setSongsHistory: (param) => {
    set(state => ({
      songsHistory: state.songsHistory.concat(param)
    }))
  },
  setAlbumsHistory: (param) => {
    set((state) => ({
      albumsHistory: state.albumsHistory.concat(param)
    }))
  },
  setArtistsHistory: (param) => {
    set((state) => ({
      artistsHistory: [
        ...state.artistsHistory.concat(param)
      ]
    }))
  },
  setPlaylistsHistory: (param) => {
    set((state) => ({
      playlistsHistory: [
        ...state.playlistsHistory.concat(param)
      ]
    }))
  },
  resetSongsHistory: () => set({ songsHistory: [] }),
  resetAlbumsHistory: () => set({ albumsHistory: [] }),
  resetArtistsHistory: () => set({ artistsHistory: [] }),
  resetPlaylistsHistory: () => set({ playlistsHistory: [] }),
  resetAllSearchHistory: () => set({
    songsHistory: [],
    albumsHistory: [],
    artistsHistory: [],
    playlistsHistory: []
  }),
}))