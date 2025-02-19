"use client";
import { fetchUsers } from "../../actions";
import { Group, User } from "../../../types";
import { useEffect, useState } from "react";
import { use } from "react";
import { useFavorites , useGroups}from "../../../lib/store"; 
import UserInfoCard from "../../../components/userInfoCard";


type UserPageProps = {
  params: Promise<Params>;
};

type Params = {
  id: string;
};

export default function UserPage({ params }: UserPageProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const id = Number(use(params).id);
  const [isFavorite,setIsFavorite] = useState<boolean>(false);
  const {favorites,addFavorite,removeFavorite} = useFavorites();
  const {groups} = useGroups();

  
  //User listesi alınıyor
  useEffect(() => {
    const getUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);

      } catch (error) {
        console.error("Kullanıcılar alınırken hata oluştu:", error);
      }
    };
    getUsers();
  }, []);
//user belirleniyor
  useEffect(() => {
    if (users.length > 0) {
      const foundUser = users.find((u) => u.id === id);
      setUser(foundUser || null);
      if(user){
        console.log(user.name," favori mi : ",isFavorite);
  console.log("favorites :  " , favorites);

      }
    }
  }, [users, id]);

    //her favorite dizisi değiştiğinde userın is favorite özelliği güncelleniyor
  useEffect(() => {
    if (user) {
      setIsFavorite(favorites.some((fav: User) => fav.id === user.id));
      console.log(user.name,": isfavorite ayarlandı");
    }
  }, [favorites, user]);


const memberships= ()=>{
  return groups.filter((group:Group)=>(group.members.some((member:User)=>(id===member.id))));
}

 


  if (!user) {
    return <div>yükleniyor...</div>;
  }

  return (
   <UserInfoCard user={user} groups={memberships()} />
  );
}
