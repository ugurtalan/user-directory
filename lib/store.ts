import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { User, Group } from '../types';

// UserStore Arayüzü



export interface favStore {
  favorites: User[];
  addFavorite: (user: User) => void;
  removeFavorite: (id: number) => void;
}

export interface userStore {
  users_tmp: User[];
  setUsers_tmp: (users:User[])=>void;
}


const useUsers = create<userStore>()(
  persist(
    (set)=>({
      users_tmp: [],
      setUsers_tmp: (updatedUsers: User[]) => set((state) => {
        return { users_tmp: updatedUsers }; // state'e doğru şekilde users'ı güncelliyoruz
    }),
    

    }),
    {
      name: 'users-storage',
      storage: createJSONStorage(() => localStorage),

    }

  )
)


const useFavorites = create<favStore>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (user: User) => set((state) => ({
        favorites: [...state.favorites, user],
      })),
      removeFavorite: (id: number) => set((state) => ({
        favorites: state.favorites.filter((user) => user.id !== id),
      })),
    }),
    {
      name: 'fav-storage', // Local storage için anahtar
      storage: createJSONStorage(() => localStorage), // sessionStorage kullanmak isterseniz
    }
  )
);

// Group Store
export interface GroupStore {
  groups: Group[];
  addGroup: (group: Group) => void;
  removeGroup: (group: Group) => void;
  updateGroup: (index: Number, group: Group) => void;
}

const useGroups = create<GroupStore>()(
  persist(
    (set) => ({
      groups: [],
      addGroup: (group: Group) => set((state) => ({
        groups: [...state.groups, group],
      })),
      removeGroup: (group: Group) => set((state) => ({
        groups: state.groups.filter((g) => g !== group),
      })),
      updateGroup: (index: Number, updatedGroup: Group) => set((state) => ({
        groups: state.groups.map((group, i) => (i === index ? updatedGroup : group)),
      })),
    }),
    {
      name: 'group-storage', // Local storage için anahtar
      storage: createJSONStorage(() => localStorage), // sessionStorage kullanmak isterseniz
    }
  )
);

export { useFavorites, useGroups, useUsers};
