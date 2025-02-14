"use client";
import { useGroups } from "../../../lib/store";
import { Group, User,groupStore } from "../../../types";
import Modal from "../../../components/Modal";
import { useState } from "react";
import { useEffect } from "react";
import { fetchUsers } from "../../actions";
const GroupPage = () =>{

  interface groupStore {
    groups: Group[];
    addGroup: (group: Group) => void;
    removeGroup: (id: string) => void;
    updateGroup: (group: Group) => void;
  }
  const {groups, addGroup, removeGroup, updateGroup} = useGroups();

const [isEditOpen,setIsEditOpen] = useState(false);
const [isAddOpen,setIsAddOpen] = useState(false);
const [users,setUsers] = useState<User[]>([])
const [selectedIndex,setSelectedIndex]=useState<Number>();
console.log(groups);
useEffect(() => {
    const getUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers); 
    };
    getUsers();
  }, []);
    return(
        //Ana Div
        <div className="w-full min-h-screen flex flex-col ">

            <h1 className="text-center mt-5 text-2xl ">Gruplar</h1>
            <hr className="h-2 bg-black w-1/2 rounded-2xl m-auto mt-1 mb-1" 
                />
            {/*Gruplar Divi*/}
                <div className="flex flex-col m-2">
                {groups.map((group: Group,index:number) =>(
                 //Her grubun kendi Divi
<div key={index} className="flex flex-col w-full justify-start mb-5">
<div className="bg-white border-black border-2  w-full rounded-lg">
                            <ul className="flex flex-col">
                            <li className="p-3 border-black border-b-8">{group.name}  </li>
                            {group.members.map((member,index)=>(
                                <li className="p-2" key={index}> {member.name} </li>
                            ))}
                    </ul>
                    {/*Gruptan eleman çıkarmak için açılan modal */}
                            {index===selectedIndex&&  <Modal isOpen={isEditOpen} onClose={()=>{setIsEditOpen(false)}}>
                                  <h1 className="font-bold ">{group.name}</h1>  
                                  {group.members.map((member,i)=>(
                                <h3 key={i}> {member.name} 
                                <button className="ml-3 bg-black text-white rounded-full w-6 mb-2" onClick={()=>{
                                   const newGroup={
                                    ...group,
                                    members: group.members.filter((m:User)=>(m.id!==member.id))
                                   }
                                   updateGroup(selectedIndex,newGroup);
                                   console.log(groups); 
                                }} >X</button>
                                </h3>
                            ))}
                        </Modal>}
                        {/*Gruba eleman ekleme işlemi için açılan modal */}
                       {selectedIndex===index&& <Modal isOpen={isAddOpen} onClose={()=>{setIsAddOpen(false)}}>
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
                                                </Modal>}
                  </div>
                  <div className=" bg-gray-500 flex flex-row rounded-lg w-1/5 overflow-hidden justify-center">
                    <button className="bg-red-300 flex-1 text-white font-bold p-2 pl-4  " onClick={()=>{removeGroup(group)}}>Grubu Sil</button>
                       <button className="p-2 bg-blue-300 flex-1  text-white font-bold " onClick={()=>{setIsAddOpen(true); setSelectedIndex(index)}}>Ekle</button>
                       <button className="p-2 bg-green-300   text-white font-bold " onClick={()=>{setSelectedIndex(index);setIsEditOpen(true)}}>Editle</button>  {/*modal açılacak burda da*/}</div>
                  </div>
                ))}
                </div>
        </div>
    );
}
export default GroupPage;