import { User } from "../types";

export const filteredUsers = (search: string, users: User[]) => {
    return users.filter((user) =>
      user.name.toLowerCase().startsWith(search.toLowerCase())
    );
  };
