import { useState } from "react";
import Modal from "./Modal";
import { User } from "../types";
import { useGroups } from "../lib/store";
import AddUserToGroup from "./addUserToGroup";
type Props = {
    isOpen: boolean;
    setIsM1Open: React.Dispatch<React.SetStateAction<boolean>>;
    users: User[];
    setAlert: React.Dispatch<React.SetStateAction<boolean>>;
};


const GroupCreate = ({ isOpen,setIsM1Open,users,setAlert }: Props  ) => {
 const [isM2Open,setIsM2Open] = useState(false);
  const [groupName,setGroupName] = useState('');
  const [members,setMembers] = useState<User[]>([]);
  const { groups, addGroup } = useGroups(); 

    return(
   <Modal isOpen={isOpen} onClose={()=>{
    setGroupName('');
    setMembers([]);
    setIsM1Open(false);
    console.log(isOpen);
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
{/*Kullanıcı Ekleme Modali */}
        <AddUserToGroup isOpen={isM2Open} onClose={()=>setIsM2Open(false)} users={users} members={members} setMember={setMembers}></AddUserToGroup>

</div>
    </div>
    <div className="bg-slate-300 p-2 rounded-md">
     Eklenen kullanıcılar :
      {members&&members.map((member:User,i)=>(
        <h1 key={i}>{member.name}</h1>
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
    );

}



export default GroupCreate;