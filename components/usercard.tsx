import { User } from '../types';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPen,faCheck } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useUsers } from '../lib/store';
type UserCardProps = {
  users: User[];
  user: User;
  onFavorite: () => void;
  isFavorite: boolean;
}
const UserCard: React.FC<UserCardProps> = ({ users, user, onFavorite, isFavorite }) => {
  const { users_tmp, setUsers_tmp } = useUsers();
  const [editedUser, setEditedUser] = useState(user); // Her kart için kullanıcı bilgisi
  const [tempUser, setTempUser] = useState(user);

  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  console.log(user.name);
  useEffect(() => {
    // Güncellenmiş kullanıcıları almak için
    const getUsers = async () => {
      setUsers_tmp(users);
    };

    getUsers();
  }, []);

  const handleInputChange = (field: "username" | "email" | "phone", value: string) => {
    setTempUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const handleClick = () => {
    if (isEditOpen) {
      const updatedUsers = users_tmp.map((user_tmp) =>
        user_tmp.id === user.id ? { ...user_tmp, username: tempUser.username ,email: tempUser.email,phone: tempUser.phone } : user_tmp
      );
      setEditedUser(tempUser); 
      setUsers_tmp(updatedUsers);
    }

    setIsEditOpen((prevState) => (!prevState
    ));
  };

  return (
    <div className={` border-4 max-w-sm max-h-80 p-0 drop-shadow-2xl relative overflow-hidden px-5 $  ${isFavorite ? 'bg-red-400' : isEditOpen ? 'bg-slate-400' : 'bg-white hover:bg-slate-200'}
 border-gray-200 rounded-lg shadow-md w-32 sm:w-40 md:w-52 lg:w-80 sm:m-3 h-fit md:h-auto`}>
      <div className="flex flex-col">
        <button
          className="absolute -top-1 -left-1 w-10 h-10 text-white font-bold rounded-br-lg bg-blue-600 text-2xl hover:text-3xl transition-all duration-250"
          onClick={onFavorite}
        >
          {isFavorite ? "-" : "+"}
        </button>         
        <div className="pl-2 flex flex-row mx-24 ">

      
          
          <Image src="/images/osi.jpg" alt="osi" className=" shadow-lg shadow-blue-200 rounded-full max-w-20 max-h-16 mt-3" width={100} height={60} objectFit="cover" />
          <button
            className="absolute -top-1 -right-1 w-10 h-10 text-white font-bold rounded-bl-lg bg-blue-600 text-2xl hover:text-3xl transition-all duration-250"
            onClick={() => {
              handleClick();
            }}
          >
                      {isEditOpen?  <FontAwesomeIcon icon={faCheck} /> :  <FontAwesomeIcon icon={faPen} />}

          </button>
        </div>
        
{/*EDİTLEME İŞLEMLERİ */}
        <div className="grid grid-cols-2 p-3 max-h-36  ">
          <label className=" pt-2 font-normal text-gray-700" htmlFor="username">
            Username:
          </label>
          <input
                       className={`font-normal text-gray-700  ${isEditOpen?'bg-white text-gray-700':'bg-slate-300 text-gray-100'} rounded-md border p-1 m-1 min-w-16`}

            type="text"
            id="username"
            disabled={!isEditOpen}
            value={isEditOpen ? tempUser.username : editedUser.username}
            onChange={(e) => {
              handleInputChange("username", e.target.value);
            }}
          />
      

          <label className=" pt-2 font-normal text-gray-700" htmlFor="email">
            Email:
          </label>
          <input
                        className={`font-normal text-gray-700 ${isEditOpen?'bg-white text-gray-700':'bg-slate-300 text-gray-100'} rounded-md border p-1 m-1 min-w-16`}

            type="text"
            id="email"
            disabled={!isEditOpen}
            value={isEditOpen ? tempUser.email : editedUser.email}
            onChange={(e) => {
              handleInputChange("email", e.target.value);
            }}
          />
        

          <label className=" pt-2 font-normal text-gray-700" htmlFor="phone">
            Phone:
          </label>
          <input
            className={`font-normal text-gray-700 ${isEditOpen?'bg-white text-gray-700 ':'bg-slate-300 text-gray-100 '} rounded-md border p-1 m-1 min-w-16`}
            type="text"
            id="phone"
            disabled={!isEditOpen}
            value={isEditOpen ? tempUser.phone : editedUser.phone}
            onChange={(e) => {
              handleInputChange("phone", e.target.value);
            }}
          />
          
        </div>
      </div>

      <div className="flex items-center justify-center w-full">
        <Link
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center absolute bottom-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800"
          href={`/users/${user.id}`}
        >
          Kullanıcıyı Görüntüle
        </Link>
      </div>
    </div>
  );
};

export default UserCard;