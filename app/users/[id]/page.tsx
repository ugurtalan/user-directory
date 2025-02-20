"use client";
import { fetchUsers } from "../../actions";
import { Group, User } from "../../../types";
import { useEffect, useState } from "react";
import { use } from "react";
import { useFavorites , useGroups, useUsers}from "../../../lib/store"; 
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

  const {users_tmp,setUsers_tmp} = useUsers();
 
  
  useEffect(() => {
    console.log(users_tmp.length);
  
    const interval = setInterval(() => {
      if (users_tmp.length > 0) {
        setUsers(users_tmp);
        console.log("users_tmp'den aldı");
        clearInterval(interval); // Veri alınınca interval'i durdur
      }
    }, 500); // 500ms'de bir kontrol et
  
    return () => clearInterval(interval); // Bileşen unmount olursa interval'i temizle
  }, []);
  

  useEffect(() => {
  
  
    const getUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers); 
      
    };
    getUsers();

  console.log("fetchden aldı");

  
}, []);
//user belirleniyorW
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
   <UserInfoCard users={users} user={user} groups={memberships()} />
  );
}
