"use client";
import { useGroups } from "../../../lib/store";
import { Group, User } from "../../../types";
import { useState } from "react";
import { useEffect } from "react";
import { fetchUsers } from "../../actions";
import UserAdd from "../../../components/GroupPage/UserAdd";
import UserDelete from "../../../components/GroupPage/UserDelete";
const GroupPage = () =>{

 
  const {groups, removeGroup} = useGroups();

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
                            <li className="hover:bg-slate-400 p-3 border-gray-700 border-b-4 text-center font-bold text-2xl text-gray-700">{group.name}  </li>
                            {group.members.map((member,index)=>(
                                <li className="p-2 border-b-2 hover:bg-slate-200" key={index}> {member.name} </li>
                            ))}
                    </ul>
                    {/*Gruptan eleman çıkarmak için açılan modal */}
                        {index===selectedIndex&&<UserDelete isOpen={isEditOpen} onClose={()=>setIsEditOpen(false)} selectedIndex={selectedIndex} group={group}></UserDelete> }
                        {/*Gruba eleman ekleme işlemi için açılan modal */}
                       {selectedIndex===index&&<UserAdd isOpen={isAddOpen} onClose={()=>(setIsAddOpen(false))} users={users} selectedIndex={selectedIndex} group={group}></UserAdd>}
                  </div>
                  <div className=" bg-gray-500 flex flex-row flex-auto  rounded-lg w-1/5 overflow-hidden justify-between">
                      <button className=" hover:bg-blue-700 border-r-2 border-slate-300 bg-blue-400  text-white font-bold p-2 flex-1 transform transition-all duration-500  " onClick={()=>{removeGroup(group)}}><span className="hidden sm:inline ">Grubu Sil</span>
</button>
                      <button className="p-2 hover:bg-blue-700 bg-blue-400     text-white font-bold flex-1 transform transition-all duration-500 " onClick={()=>{setIsAddOpen(true); setSelectedIndex(index)}}><span className="hidden sm:inline ">Ekle</span></button>
                      <button className="p-2 hover:bg-blue-700 bg-blue-400 border-l-2 border-slate-300  text-white font-bold flex-1 transform transition-all duration-500 " onClick={()=>{setSelectedIndex(index);setIsEditOpen(true)}}><span className="hidden sm:inline ">Editle</span></button>  {/*modal açılacak burda da*/}</div>
                  </div>
                ))}
                </div>
        </div>
    );
}
export default GroupPage;