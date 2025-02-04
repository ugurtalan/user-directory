import { create } from 'zustand';

const useFavorites = create((set) => ({
  favorites: [],
  addFavorite: (user) => set((state) => ({
    favorites: [...state.favorites, user], 
  })),
  removeFavorite: (id) => set((state) => ({
    favorites: state.favorites.filter((user) => user.id !== id), 
  })),
}));

export default useFavorites;
