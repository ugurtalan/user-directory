import Modal from "./Modal";
import { User } from "../types";
import { useState } from "react";
import { filteredUsers } from "../lib/utils";
type Props = {
    isOpen:boolean;
    onClose:()=>void;
    users:User[];
    members:User[];
    setMember:React.Dispatch<React.SetStateAction<User[]>> ;
} 
    const AddUserToGroup = ({isOpen,onClose,users,members,setMember}: Props) =>{
          const [searchForMember,setSearchForMember] = useState("");
        
        return(

            <Modal isOpen={isOpen} onClose={onClose}>
  <input className="border-2 rounded-sm border-slate-800" type="text" placeholder="ara..." value={searchForMember} onChange={(e)=>{
    setSearchForMember(e.target.value);
  }}/>

{(filteredUsers(searchForMember,users)).map((member) => (
!members.some((m)=>(m.id===member.id))&&
<h3 className="mt-2 relative" key={member.id}>
  {member.name}
  <button className="absolute right-1 bg-slate-900 text-white rounded-full  w-6 "
    onClick={() => {
      setMember([...members, member]);
      console.log(member);
      console.log(members);
    
    
    }}
  >
    +
  </button>
</h3>
))}
</Modal>


        );
    }

    export default AddUserToGroup;