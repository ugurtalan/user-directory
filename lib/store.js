import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFavorites = create(persist((set) => ({

  favorites: [],
  addFavorite: (user) => set((state) => ({
    favorites: [...state.favorites, user], 
  })),
  removeFavorite: (id) => set((state) => ({
    favorites: state.favorites.filter((user) => user.id !== id), 
  })),
}),
{
  name: 'favorite-Storage',
  getStorage: () => sessionStorage,
}
));

export default useFavorites;
