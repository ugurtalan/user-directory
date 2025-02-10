'use client';
import { useState, useEffect,useMemo } from 'react';
import { fetchUsers } from '../actions';
import UserCard from '../../components/usercard';
import UserTable from '../../components/usertable';
import { User } from '../../types'; 
import { useFavorites , useGroups } from '../../lib/store';
import Modal from '../../components/Modal';
import Link from 'next/link';
import Alert from '../../components/Alert';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const { groups, addGroup, removeGroup } = useGroups(); 
  const { favorites, addFavorite, removeFavorite } = useFavorites(); 
  const [isM1Open,setIsM1Open] = useState(false);
  const [isM2Open,setIsM2Open] = useState(false);
  const [searchForMember,setSearchForMember] = useState("");
  const [groupName,setGroupName] = useState('');
  const [members,setMembers] = useState<User[]>([]);
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    const getUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers); 
    };

    getUsers();
  }, []);

  //Arama tablosu için filtreleme işlemi
  const filteredUsers = (search: string) =>
    useMemo(() => {
      return users.filter((user) =>
        user.name.toLowerCase().startsWith(search.toLowerCase())
      );
    }, [users, search]);
  
  
  

  return (
   <div suppressHydrationWarning={true}>
    {/* Ana div*/}

<div className="flex flex-col flex-wrap justify-center items-center w-full" >
     
     {/*Arama Çubuğu*/}
     <input 
        type="text"
        placeholder="İsim 🔍 "
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className=" text-black p-2 border rounded-md mb-4 w-1/3"
      />
    {/*Favoriler ve userTable ı içeren div*/}
      <div className="h-screen flex flex-row  overflow-auto ">
      
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


<button className="text-white font-bold text-center bg-green-500 ml-5  p-3 pb-2"  onClick={()=>{
      setIsM1Open(true);
    }}>
      Grup Oluştur
    </button>
<Link className="text-white font-bold text-center bg-blue-500 ml-5 rounded-b-lg p-3 pb-2" href='/users/groups'>
     Gruplara git
     </Link>

     </div>
      


       {/*userTable Alanı*/}
      <UserTable
      
      >
        {filteredUsers(searchQuery).map((user) => (
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
    
  


    <Modal isOpen={isM1Open} onClose={()=>{
      setGroupName('');
      setMembers([]);
      setIsM1Open(false);
    }} >
      
      <div>
      <h1 className="font-bold text-center ">Grup oluştur
        
</h1>

<div className="flex flex-row relative my-2 ">
<label htmlFor="groupName" className="" >Grup İsmi: 
</label>
<input id="groupName" className="absolute right-0 w-2/3 border-2 border-solid border-black rounded-md " type="text" placeholder='' value={groupName}  
  onChange={(e) =>{
    setGroupName(e.target.value);
  }
  }
  />
</div>
<h2 className="my-3">Kullanıcı Ekle
<button className="bg-black text-white ml-3 w-8 rounded-md " onClick={()=>{
  setIsM2Open(true);
}}>+</button>
</h2>

<div>

<Modal isOpen={isM2Open} onClose={()=>{setIsM2Open(false);}}>
    <input type="text" placeholder="İsim" value={searchForMember} onChange={(e)=>{
      setSearchForMember(e.target.value);
    }}/>

{(filteredUsers(searchForMember) || []).map((member) => (
  !members.some((m)=>(m.id===member.id))&&
  <h3 key={member.id}>
    {member.name}
    <button
      onClick={() => {
        setMembers([...members, member]);
        console.log(member);
        console.log(members);
      
      
      }}
    >
      +
    </button>
  </h3>
))}
</Modal>

</div>
      </div>
      <div className="bg-slate-300 p-2 rounded-md">
       Eklenen kullanıcılar :
        {members&&members.map((member:User)=>(
          <h1>{member.name}</h1>
        ))}
      </div>
      <button className="bg-green-500 p-3 my-3 rounded-md text-white"  onClick={()=>{
const group = {
  name: groupName,
  members: members,
}
if(groupName===''||groupName===' '){
  setAlert(true);
}
else{console.log(group)
  addGroup(group);
  console.log(groups);
  setIsM1Open(false);
  setMembers([]);
  setGroupName('');}

}}>Gönder</button>
</Modal>
     
     </div>

     <Alert onClose={()=>setAlert(false)} isOpen={alert}></Alert>

   </div>
   
   
  );
}
