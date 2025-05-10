import { User,Group } from "../../types";
import Modal from "../Modal";
import { useGroups } from "../../lib/store";
type Props = {
    isOpen:boolean;
    onClose:()=>void;
    users:User[];
    selectedIndex:Number;
    group:Group;

} 

const UserAdd = ({isOpen,onClose,users,selectedIndex,group}: Props)=>{

    const{updateGroup} = useGroups();
    return(
        <Modal isOpen={isOpen} onClose={onClose}>
                        {(users).map((member,i) => (
                          !group.members.some((a)=>(a.id===member.id))&&
                           <div key={i} >
                        <h2 className="relative mt-2"> {member.name}

                        <button className= " absolute right-1 text-white font-bold rounded-full bg-black w-6"
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
                        </h2>
                           
                           </div>
                        ))}
                                                </Modal>
    );

}

export default UserAdd;