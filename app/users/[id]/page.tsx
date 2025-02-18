"use client";
import { fetchUsers } from "../../actions";
import { Group, User } from "../../../types";
import { useEffect, useState } from "react";
import { use } from "react";
import { useFavorites , useGroups}from "../../../lib/store"; 


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


const memberships = ()=>{
  return groups.filter((group:Group)=>(group.members.some((member:User)=>(id===member.id))));
}

 const handleClick = () =>{
  if(isFavorite){
   if(user){
  removeFavorite(user.id);
   }
  }else{
  user&&addFavorite(user);
  } 

  if(user){
    console.log(user.name," favori mi : ",isFavorite);
  }
  console.log("favorites :  " , favorites);
}


  if (!user) {
    return <div>yükleniyor...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen" suppressHydrationWarning={true}>
<div className="flex-col border-4 border-slate-400 rounded-lg bg-white  bg-w flex justify-start ">
      <p className="text-zinc-500 p-4 text-2xl font-bold hover:bg-slate-300    border-b-1">Kullanıcı Adı: {user.name}</p>
      <p className="text-zinc-500 p-4 text-2xl font-bold hover:bg-slate-300   border-b-1">Username: {user.username}</p>
      <p className="text-zinc-500 p-4 text-2xl font-bold hover:bg-slate-300   border-b-1">Email: {user.email}</p>
      <p className="text-zinc-500 p-4 text-2xl font-bold  hover:bg-slate-300  border-b-1">Website: {user.website}</p>
      <p className="text-zinc-500 p-4 text-2xl font-bold  hover:bg-slate-300  border-b-1">Phone-number: {user.phone}</p>
      <p className="text-zinc-500 p-4 text-2xl font-bold  hover:bg-slate-300  border-b-1">Adress: {`${user.address.city} / ${user.address.street}/ ${user.address.suite}`}</p>
      <p className="text-zinc-500 p-4 text-2xl font-bold  hover:bg-slate-300  border-b-1">Company: {user.company.name}</p>
        <p className="text-zinc-500 flex flex-row p-4  hover:bg-slate-300 text-2xl font-bold">Memberships:</p>
        <ul className="text-zinc-500 flex flex-row p-4  hover:bg-slate-300 text-2xl font-bold">  
          {memberships().map((group:Group,index:number)=>(
            <li key={index} className="text-zinc-500 m-2 text-2xl font-bold">{group.name} ,</li>
          ))}
          </ul>      
      <button
          onClick={() => handleClick()} 
          className="bg-blue-500 text-white w-48 h-16 mx-auto mb-2 mt-2 font-bold rounded-md hover:bg-blue-800  transition-all duration-500 ease-in-out"
        >
          {isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle"}
        </button>
  
    </div>
    </div>
  );
}
