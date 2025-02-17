import { User } from "../../types";
import Modal from "../Modal";
import { Group } from "../../types";
import { useGroups } from "../../lib/store";
type Props = {
    isOpen:boolean;
    onClose:()=>void;
    users:User[];
    selectedIndex:Number;
    group:Group;

} 

const UserAdd = ({isOpen,onClose,users,selectedIndex,group}: Props)=>{

    const{groups,addGroup,removeGroup,updateGroup} = useGroups();
    return(
        <Modal isOpen={isOpen} onClose={onClose}>
                        {(users).map((member,i) => (
                          !group.members.some((a)=>(a.id===member.id))&&
                           <div key={i} >
                        <h2>{member.name}</h2>
                           <button className="text-white font-bold rounded-full bg-black w-6"
                              onClick={() => {
                              const newGroup={
                                ...group,
                                members: [...group.members,member]
                               }
                               console.log(newGroup);
                               updateGroup(selectedIndex,newGroup);
                              }}
                            >
                              +
                            </button>
                           </div>
                        ))}
                                                </Modal>
    );

}

export default UserAdd;