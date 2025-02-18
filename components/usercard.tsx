import { User } from '../types';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
type UserCardProps = {
  user: User;
  onFavorite: () => void;
  isFavorite: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, onFavorite,isFavorite }) => {
  
  return (
    <div className="hover:bg-slate-200 border-4 max-w-sm max-h-80 p-6 relative overflow-hidden bg-white  border-gray-200 rounded-lg shadow-md   w-32 sm:w-40 md:w-52 lg:w-80 sm:m-3 h-fit md:h-auto ">
      <div className="p-4 ">
      <button className="absolute -top-1 -left-1 w-10 h-10 text-white font-bold rounded-br-lg  bg-blue-600 text-2xl hover:text-3xl transition-all duration-250   " onClick={onFavorite}>
           {isFavorite ?"-":"+"}
            </button>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{user.name}
          
        </h2>
        <p className="mb-3 font-normal text-gray-700" >Username: {user.username}</p>
        <p className="mb-3 font-normal text-gray-700" >Email: {user.email}</p>
        <p className="mb-3 font-normal text-gray-700" >Phone: {user.phone}</p>
        {isFavorite && <FontAwesomeIcon icon={faHeart} className="text-red-600 mx-auto w-full" />}
      </div>
      
      
      <div className="flex items-center justify-center w-full">
     
       <Link className=" inline-flex items-center px-3 py-2 text-sm font-medium text-center absolute bottom-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800   " href={`/users/${user.id}`}> 
       Kullanıcıyı Görüntüle
       </Link>

       
      </div>
    </div>
  );
};

export default UserCard;

