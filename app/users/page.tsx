'use client';
import { useState, useEffect,useMemo } from 'react';
import { fetchUsers } from '../actions';
import UserCard from '../../components/usercard';
import UserTable from '../../components/usertable';
import { useRouter } from 'next/navigation';
import { User } from '../../types'; 
import useFavorites from '../../lib/store';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const router = useRouter();
  const { favorites, addFavorite, removeFavorite } = useFavorites(); 
  useEffect(() => {
    const getUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers); 
    };

    getUsers();
  }, []);


   //dynamic routing
  const handleClick = (userid: number) => {     
    router.push(`/users/${userid}`);
  };

  //Arama tablosu için filtreleme işlemi
  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().startsWith(searchQuery.toLowerCase()) 
    );
  }, [users, searchQuery]);
  
  

  return (
   // Ana div
   <div className="flex flex-col justify-center items-center" >
     
     {/*Arama Çubuğu*/}
     <input 
        type="text"
        placeholder="İsim 🔍 "
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border rounded-md mb-4 w-1/3"
      />
    {/*Favoriler ve userTable ı içeren div*/}
      <div className="h-screen flex flex-row min-w-full ">
      
    {/*Favoriler divi*/}
     <div className="flex flex-col min-h-full">
     <div className="overflow-auto relative flex flex-col item-center mt-10 ml-5 border-8 border-r-4 rounded-md bg-slate-300 h-1/2 w-full max-w-48 min-w-48">
       
       <h1 className="text-center mt-2">Favoriler</h1>
       {/*favoriler altındaki çizgi */}
       <div className="w-full h-1 bg-black mt-2 opacity-70"></div>
         <ul>
           {
 
             favorites.map((user: User) => (
               <li className=" relative font-bold bg-neutral-900 text-cyan-50 p-3 py-1 mt-2" key={user.id}>
                 {user.name} 
                 {/*Favoriler listesi tek tek silme işlemi*/}
                 <button onClick={() => {
                   removeFavorite(user.id);
                 }} className="text-red-400 absolute right-1 ">X</button>
               </li>
             ))
           }
         </ul>
         
       </div>
       {/*Bütün Listeyi Silme İşlemi*/}
       <button className="bg-red-900 text-yellow-50  p-3 pb-2 pt-2 rounded-b-lg  ml-5 " onClick={()=>users.forEach((user : User)=>{
         removeFavorite(user.id);
        })}>Temizle</button>

     </div>
      


       {/*userTable Alanı*/}
      <UserTable
      
      >
        {filteredUsers.map((user) => (
          <UserCard
            onClick={() => handleClick(user.id)}
            key={user.id}
            user={user}
            
            //UserCard üzerinde ekleme işlemi
            
            onFavorite={() => {
              const userExists = favorites.some((fav: User) => fav.id === user.id);
            
              if (!userExists) {
                addFavorite(user);
              }
            }}
            
          />
        ))}
      </UserTable>
    </div>
    </div>
  );
}
