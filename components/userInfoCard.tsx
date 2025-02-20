'use client';
import { useEffect, useState } from "react";
import { Group, User } from "../types";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useUsers } from "../lib/store";

type Props = {
    user: User;
    groups: Group[];
    users: User[];
}

const UserInfoCard = ({ user,groups,users }: Props) => {
    // 'tab' tipini yalnızca "info" veya "groups" olarak belirliyoruz
    const [tab, setTab] = useState<"info" | "groups">("info");
    const [isTabOpen,setIsTabOpen]= useState<boolean>(false);
    const [isModalOpen,setIsModalOpen]=useState<boolean>(false);
    const [editedUser, setEditedUser] = useState<User>(user);
    const [tempUser, setTempUser] = useState<User>(user); 
    const {users_tmp,setUsers_tmp} = useUsers();
    
    
    useEffect(() => {
        const getUsers = async () => {
          // Örneğin, 'userId' gibi bir id'yi kontrol edelim
      
          const foundUser = users_tmp.find((user_tmp) => user_tmp.id === user.id);
      
          if (foundUser) {
            // Eğer eşleşen kullanıcı varsa, setEditedUser ile güncelleme yapalım
            setEditedUser(foundUser);
          }
        };
      
        getUsers();
      }, []); // users_tmp değiştiğinde tekrar çalışacak
      
    

    const handleTabChange = (newTab: "info" | "groups") => {
        setTab(newTab);
    };

    const handleInputChange = (field: "name" | "username", value: string) => {
        setTempUser((prevUser) => ({
            ...prevUser,
            [field]: value
        }));
    };
    
    // Butona basıldığında değişiklikleri kaydet
    const handleClick = (field: "name" | "username") => {
       
        setUsers_tmp(users);
        setEditedUser((prevUser) => ({
            ...prevUser,
            [field]: tempUser[field], // Sadece butona basıldığında kaydediliyor
        }));
        const updatedUsers = users_tmp.map((user) => 
            user.id === editedUser.id 
                ? { ...user, [field]: editedUser[field] } // Eğer user id'si eşleşiyorsa, güncelle
                : user // Eşleşmezse olduğu gibi bırak

        );
        console.log(tempUser);
        console.log(editedUser);
        console.log(user);
        console.log(users_tmp)
        
        // Güncellenmiş kullanıcıları setUsers_tmp'ye gönder
        setUsers_tmp(updatedUsers);
        


        console.log(`${field} güncellendi:`, tempUser[field]); 
    };
    

    return (
        //genel div
       
             <div className= "flex flex-col justify-center items-center min-h-screen">
            
            <div className="flex flex-row ">

            <button onClick={()=>{
                setIsTabOpen(!isTabOpen);
            }} className={`rounded-full text-zinc-200  min-w-20 min-h-12 mb-4 ${isTabOpen?'bg-red-600':'bg-blue-600'}`}>{`${isTabOpen?'KAPAT':'AÇ'}`}</button>
                <button  className="rounded-full text-zinc-200  min-w-10 h-12 ml-4 mb-4 bg-blue-600" onClick={
                    ()=>{setIsModalOpen(true)}
                }>
                    <FontAwesomeIcon icon={faPen}/>{}
                </button>

                
           
            </div>
            <Modal isOpen={isModalOpen} onClose={()=>{setIsModalOpen(false);}}>
            <div className="flex flex-row lg:w-full justify-between mt-2">
    <label className="text-sm min-w-16 mr-3 lg:text-lg pt-1">Name </label>
    <input
        id="name"
        className=" bg-slate-200 rounded-md max-w-44 lg:min-w-72 p-2"
        type="text"
        name="isim"
        value={tempUser.name}
        placeholder={editedUser.name}
        onChange={(e)=>{handleInputChange('name',e.target.value )}}
    />
    <button onClick={() => {handleClick('name')}} className="rounded-full ml-3 text-zinc-200 text-sm min-w-5 h-6 mb-4 bg-blue-600">!</button>
</div>

<div className="flex flex-row pt-2 lg:w-full justify-between">
    <label className="text-sm min-w-16 mr-3 lg:text-lg pt-1">Username </label>
    <input
        id="username"
        className="bg-slate-200 rounded-md max-w-44 lg:min-w-72 p-2"
        type="text"
        name="isim"
        value={tempUser.username}
        placeholder={editedUser.username}
        onChange={(e)=>{handleInputChange('username',e.target.value )}}

        
    />
    <button onClick={() => {handleClick('username')}} className="rounded-full ml-3 text-zinc-200 text-sm min-w-5 h-6 mb-4 bg-blue-600">!</button>
</div>


               

               

               

            </Modal>
           <div className={`transition-all ease-in-out duration-300 bg-white rounded-xl shadow-xl shadow-gray-900 overflow-hidden min-w-userinfocard ${isTabOpen ? 'max-h-userinfocard' : 'max-h-10'}`}>

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
                        <p className="  bg-slate-400 font-bold p-2 rounded-lg  hover:bg-slate-600 hover:text-slate-200 ">{editedUser.name}</p>
                        <h1 className=" p-2 min-w-56 font-bold   ">Username : </h1>
                        <p className="  bg-slate-400 font-bold p-2 rounded-lg  hover:bg-slate-600 hover:text-slate-200 ">{editedUser.username}</p>

                        <h1 className=" p-2 min-w-56 font-bold  ">E-mail : </h1>
                        <p className="  bg-slate-400 font-bold p-2 rounded-lg  hover:bg-slate-600 hover:text-slate-200 ">{editedUser.email}</p>
                        <h1 className=" p-2 min-w-56 font-bold  ">Website : </h1>
                        <p className="  bg-slate-400 font-bold p-2 rounded-lg  hover:bg-slate-600 hover:text-slate-200 ">{editedUser.website}</p>
                        <h1 className=" p-2 min-w-56  font-bold ">Phone Number : </h1>
                        <p className="  bg-slate-400 font-bold p-2 rounded-lg  hover:bg-slate-600 hover:text-slate-200 ">{editedUser.phone}</p>
                        <h1 className=" p-2 min-w-56  font-bold ">Adress : </h1>
                        <p className="  bg-slate-400 font-bold p-2 rounded-lg  hover:bg-slate-600 hover:text-slate-200 ">{editedUser.address.city} {user.address.street} {user.address.suite} {user.address.zipcode}</p>  
                        <h1 className=" p-2 min-w-56  font-bold ">Company : </h1>
                        <p className="  bg-slate-400 font-bold p-2 rounded-lg  hover:bg-slate-600 hover:text-slate-200 ">{editedUser.company.name} ({user.company.catchPhrase})</p>  
                    
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
