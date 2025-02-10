import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Favorites Store
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

// Groups Store
const useGroups = create(persist((set) => ({
  groups: [],
  addGroup: (group) => set((state) => ({
    groups: [...state.groups, group],
  })),
  removeGroup: (group) => set((state) => ({
    groups: state.groups.filter((g) => g !== group), // Filter the group out
  })),
  updateGroup: (index, updatedGroup) => set((state) => ({
    groups: state.groups.map((group, i) => (i === index ? updatedGroup : group)),
  })),
}),

{
  name: 'groups-Storage',
  getStorage: () => sessionStorage,

}

));

// Export both stores
export { useFavorites, useGroups };
