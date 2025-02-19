'use client';
import { useState } from "react";
import { Group, User } from "../types";

type Props = {
    user: User;
    groups: Group[];
}

const UserInfoCard = ({ user,groups }: Props) => {
    // 'tab' tipini yalnızca "info" veya "groups" olarak belirliyoruz
    const [tab, setTab] = useState<"info" | "groups">("info");
    const [isOpen,setIsOpen]= useState<boolean>(false);
    const handleTabChange = (newTab: "info" | "groups") => {
        setTab(newTab);
    };

    return (
        //genel div
       
             <div className= "flex flex-col justify-center items-center min-h-screen">
            
            <button onClick={()=>{
                setIsOpen(!isOpen);
            }} className={`rounded-full text-zinc-200  min-w-20 min-h-12 mb-4 ${isOpen?'bg-red-600':'bg-blue-600'}`}>{`${isOpen?'KAPAT':'AÇ'}`}</button>
           <div className={`transition-all ease-in-out duration-300 bg-white rounded-xl shadow-xl shadow-gray-900 overflow-hidden min-w-userinfocard ${isOpen ? 'max-h-userinfocard' : 'max-h-10'}`}>

           <div className=" flex flex-row justify-between">
                <button
                    className={`px-4 py-2 flex-1 ${tab === "info" ? "bg-slate-200 border-b-4 border-blue-500 text-blue-500" : "bg-slate-500"}`}
                    onClick={() => handleTabChange("info")}
                >
                    Bilgiler
                </button>
                <button
                    className={`px-4 py-2 flex-1 ${tab === "groups" ? "bg-slate-200 border-b-4 border-blue-500 text-blue-500" : "bg-slate-500"}`}
                    onClick={() => handleTabChange("groups")}
                >
                    Gruplar
                </button>
            </div>

            {tab === "info" && (
                <div className=" bg-white p-2  ">
                    <h1 className=" p-2 min-w-56 font-bold  ">Name : </h1>
                    {/* Diğer bilgiler buraya eklenebilir */}
                        <p className="  bg-slate-400 font-bold p-2 rounded-lg  hover:bg-slate-600 hover:text-slate-200 ">{user.name}</p>
                        <h1 className=" p-2 min-w-56 font-bold   ">Username : </h1>
                    {/* Diğer bilgiler buraya eklenebilir */}
                        <p className="  bg-slate-400 font-bold p-2 rounded-lg  hover:bg-slate-600 hover:text-slate-200 ">{user.username}</p>

                        <h1 className=" p-2 min-w-56 font-bold  ">E-mail : </h1>
                    {/* Diğer bilgiler buraya eklenebilir */}
                        <p className="  bg-slate-400 font-bold p-2 rounded-lg  hover:bg-slate-600 hover:text-slate-200 ">{user.email}</p>
                        <h1 className=" p-2 min-w-56 font-bold  ">Website : </h1>
                    {/* Diğer bilgiler buraya eklenebilir */}
                        <p className="  bg-slate-400 font-bold p-2 rounded-lg  hover:bg-slate-600 hover:text-slate-200 ">{user.website}</p>
                        <h1 className=" p-2 min-w-56  font-bold ">Phone Number : </h1>
                    {/* Diğer bilgiler buraya eklenebilir */}
                        <p className="  bg-slate-400 font-bold p-2 rounded-lg  hover:bg-slate-600 hover:text-slate-200 ">{user.phone}</p>
                        <h1 className=" p-2 min-w-56  font-bold ">Adress : </h1>
                    {/* Diğer bilgiler buraya eklenebilir */}
                        <p className="  bg-slate-400 font-bold p-2 rounded-lg  hover:bg-slate-600 hover:text-slate-200 ">{user.address.city} {user.address.street} {user.address.suite} {user.address.zipcode}</p>  
                        <h1 className=" p-2 min-w-56  font-bold ">Company : </h1>
                        <p className="  bg-slate-400 font-bold p-2 rounded-lg  hover:bg-slate-600 hover:text-slate-200 ">{user.company.name} ({user.company.catchPhrase})</p>  
                    
                </div>
            )}

            {tab === "groups" && (
                <div className="bg-white ">
                    <h1 className="bg-white  p-6 min-w-56 font-bold">{user.name} Üye Olduğu Gruplar:</h1>
                    <ul>
                        {groups&&groups.map((group,index)=>(
                            <li className="bg-slate-400 mb-6 mx-2 font-bold p-2 rounded-lg  hover:bg-slate-600 hover:text-slate-200 " key={index} >{group.name}</li>
                        ))}

                    </ul>
                </div>
            )}

           </div>
        </div>

       
    );
}

export default UserInfoCard;
