import { Group,User } from "../../types";
import Modal from "../Modal";
import { useGroups } from "../../lib/store";

type Props = {
    isOpen:boolean;
    onClose:()=>void;
    selectedIndex:Number;
    group:Group;

} 

const UserDelete:React.FC<Props> = ({isOpen,onClose,selectedIndex,group}:Props)=>{
    const {updateGroup} = useGroups();
    
    return(

<Modal isOpen={isOpen} onClose={onClose}>
                                  <h1 className="font-bold ">{group.name}</h1>  
                                  {group.members.map((member,i)=>(
                                <h3 key={i}> {member.name} 
                                <button className="ml-3 bg-black text-white rounded-full w-6 mb-2" onClick={()=>{
                                   const newGroup={
                                    ...group,
                                    members: group.members.filter((m:User)=>(m.id!==member.id))
                                   }
                                   updateGroup(selectedIndex,newGroup);
                                }} >X</button>
                                </h3>
                            ))}
                        </Modal>

    );
}


export default  UserDelete;