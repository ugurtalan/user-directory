import Modal from "./Modal";
import { User } from "../types";
import { useState } from "react";
import { filteredUsers } from "../lib/utils";
import { Dispatch,SetStateAction } from "react";
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
  <input type="text" placeholder="İsim" value={searchForMember} onChange={(e)=>{
    setSearchForMember(e.target.value);
  }}/>

{(filteredUsers(searchForMember,users)).map((member) => (
!members.some((m)=>(m.id===member.id))&&
<h3 key={member.id}>
  {member.name}
  <button
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