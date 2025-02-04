"use client";
import { fetchUsers } from "../../actions";
import { User } from "../../types";
import { useEffect, useState } from "react";
import { use } from "react";
import useFavorites from "../../lib/store"; 

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


 


 const handleClick = () =>{
  if(isFavorite){
   if(user){
    removeFavorite(user.id);
    setIsFavorite(!isFavorite);
   }
  }else{
  addFavorite(user)
   setIsFavorite(!isFavorite);
  } 

  if(user){
    console.log(user.name," favori mi : ",isFavorite);
  }
  console.log("favorites :  " , favorites);
}


  if (!user) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <p className="m-2 text-2xl font-bold">Kullanıcı Adı: {user.name}</p>
      <p className="m-2 text-2xl font-bold">Username: {user.username}</p>
      <p className="m-2 text-2xl font-bold">Email: {user.email}</p>
      <p className="m-2 text-2xl font-bold">Website: {user.website}</p>
      <p className="m-2 text-2xl font-bold">Phone-number: {user.phone}</p>
      <p className="m-2 text-2xl font-bold">Adress: {`${user.address.city} / ${user.address.street}/ ${user.address.suite}`}</p>
      <p className="m-2 text-2xl font-bold">Company: {user.company.name}</p>
      <button
          onClick={() => handleClick()} 
          className="bg-slate-900 text-white w-48 h-16 font-bold rounded-md hover:bg-white hover:text-black transition-all duration-500 ease-in-out"
        >
          {isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle"}
        </button>
  
    </div>
  );
}
