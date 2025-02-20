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
import { useUsers } from '../../lib/store';
export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const {favorites, addFavorite, removeFavorite } = useFavorites(); 
  const [isM1Open,setIsM1Open] = useState(false);
  const [alert, setAlert] = useState(false);
  const [isSearch,setIsSearch] = useState(false);
  const {users_tmp,setUsers_tmp} = useUsers();
  console.log("User_tmp Dizisi : ",users_tmp);

  
  

  useEffect(() => {
  
  
    
    const getUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers); 
      
    };
    getUsers();

  console.log("fetchden aldı");

  

  
}, []);



useEffect(() => {
  
  if (users_tmp.length > 0) {
   const getUsers = async ()=>{
    setUsers(users_tmp);
    console.log("users_tmp'den aldı");
    console.log("users",users);
    console.log("useerstemp",users_tmp)
   }
    
  getUsers();
  }
}, [[],users_tmp]);
  return (
    /* Ana Div */
   <div className="flex flex-row flex-wrap justify-center items-center w-full h-full"  suppressHydrationWarning={true}>
  
  
     {/*Arama Çubuğu*/}
     <input 
        type="text"
        placeholder={isSearch?"İsim 🔍":''}
        value={searchQuery}
        onChange={isSearch?(e) => setSearchQuery(e.target.value):()=>('')}
        className={`transition-all duration-300 p-2 rounded-md ${isSearch ? 'w-64' : 'w-16'}`}
      />    
       {/*Arama çubuğunu açmak  için Buton*/}
     <button onClick={()=>setIsSearch(!isSearch)} className="font-bold bg-blue-600 m-2 rounded-md text-sm  p-3">Ara</button>

    {/*Favoriler ve userTable ı içeren div*/}
      <div className=" flex flex-row  overflow-auto w-full h-full ">   
    {/*Favoriler divi*/}
     <div className="flex flex-col min-h-full ">
     <div className="overflow-auto relative flex flex-col item-center mt-4 ml-5 border-8 border-r-4 shadow-md rounded-t-md bg-white h-1/2 w-full max-w-60 min-w-60">
       
       <h1 className="text-start pl-2  text-2xl  mt-2 text-black font-bold">Favoriler</h1>
       {/*favoriler altındaki çizgi */}
       <div className="w-full h-0.5 bg-slate-600  mt-2 opacity-70"></div>
         <ul>
           {
             favorites.map((user: User) => (
               <li  className="border-b-2 border-slate-200 hover:bg-slate-200 relative font-bold text-slate-700 px-1 py-1 " key={user.id}>
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
       <button className= "hover:bg-blue-800 bg-blue-700 border-b-2 text-yellow-50 font-bold  p-3 pb-2 pt-2   ml-5 " onClick={()=>users.forEach((user : User)=>{
         removeFavorite(user.id);
        })}>Temizle</button>
        {/*Grup oluşturma butonu*/ }
        <button className="hover:bg-blue-800 text-white font-bold text-center border-b-2 bg-blue-700 ml-5  p-3 pb-2"  onClick={()=>{
       setIsM1Open(true);
         }}>
       Grup Oluştur
        </button>
    {/*Gruplara giden link */}
        <Link className=" hover:bg-blue-800 text-white font-bold text-center bg-blue-700 ml-5 rounded-b-lg p-3 pb-2" href='/users/groups'>
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
              else{
                removeFavorite(user.id);
              }
            }}
            isFavorite={
              favorites.some((fav: User) => fav.id === user.id)
            }            
          />
        ))}
      </UserTable>
    </div>
    {/*Grup oluşturma Modali */}
    <GroupCreate isOpen={isM1Open} setIsM1Open={setIsM1Open} users={users} setAlert={setAlert}></GroupCreate>
      {/*Grup ismi girilmediğinde uyarı gönderen Modal */}
     <Alert onClose={()=>setAlert(false)} isOpen={alert}></Alert>
   </div>
  );
}
