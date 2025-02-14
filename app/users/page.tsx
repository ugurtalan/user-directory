'use client';
import { useState, useEffect } from 'react';
import { fetchUsers } from '../actions';
import UserCard from '../../components/usercard';
import UserTable from '../../components/usertable';
import { User } from '../../types'; 
import { useFavorites  } from '../../lib/store';
import Link from 'next/link';
import Alert from '../../components/Alert';
import GroupCreate from '../../components/groupCreate';
import { filteredUsers } from '../../lib/utils';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const { favorites, addFavorite, removeFavorite } = useFavorites(); 
  const [isM1Open,setIsM1Open] = useState(false);
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    const getUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers); 
    };

    getUsers();
  }, []);

  //Arama tablosu için filtreleme işlemi

  
  
  

  return (
   <div className="flex flex-row flex-wrap justify-center items-center w-full h-full"  suppressHydrationWarning={true}>
    {/* Ana div*/}


     
     {/*Arama Çubuğu*/}
     <input 
        type="text"
        placeholder="İsim 🔍 "
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className=" text-black p-2 border rounded-md mb-4 w-1/3"
      />

      
    {/*Favoriler ve userTable ı içeren div*/}
      <div className=" flex flex-row  overflow-auto w-full h-full ">
      
    {/*Favoriler divi*/}
     <div className="flex flex-col min-h-full">
     <div className="overflow-auto relative flex flex-col item-center mt-10 ml-5 border-8 border-r-4 rounded-md bg-slate-300 h-1/2 w-full max-w-48 min-w-48">
       
       <h1 className="text-center mt-2 text-black font-bold">Favoriler</h1>
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
       <button className="bg-red-900 text-yellow-50 font-bold  p-3 pb-2 pt-2   ml-5 " onClick={()=>users.forEach((user : User)=>{
         removeFavorite(user.id);
        })}>Temizle</button>

{/*Grup oluşturma butonu*/ }
<button className="text-white font-bold text-center bg-green-500 ml-5  p-3 pb-2"  onClick={()=>{
      setIsM1Open(true);
    }}>
      Grup Oluştur
    </button>
    {/*Gruplara giden link */}
<Link className="text-white font-bold text-center bg-blue-500 ml-5 rounded-b-lg p-3 pb-2" href='/users/groups'>
     Gruplara git
     </Link>
     </div>
       {/*userTable Alanı*/}
      <UserTable
      >
        {filteredUsers(searchQuery,users).map((user) => (
          <UserCard
            key={user.id}
            user={user}
            //UserCard üzerinde ekleme işlemi
            onFavorite={() => {
              const userExists = favorites.some((fav: User) => fav.id === user.id);
              if (!userExists) {
                addFavorite(user);
                console.log(favorites);
              }
            }}
            isFavorite={
              favorites.some((fav: User) => fav.id === user.id)
            }            
          />
        ))}
      </UserTable>
    </div>
    <GroupCreate isOpen={isM1Open} setIsM1Open={setIsM1Open} users={users} setAlert={setAlert}></GroupCreate>
      {/*Grup ismi girilmediğinde uyarı gönderen Modal */}
     <Alert onClose={()=>setAlert(false)} isOpen={alert}></Alert>
   </div>
  );
}
