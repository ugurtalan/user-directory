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
    <div className="group user-card border-2 border-black rounded-2xl  overflow-hidden w-60 h-48 bg-white shadow-md relative my-0 mx-1 hover:bg-slate-300  transition-all duration-300 cursor-default">
      <div className="p-4">
        <h2 className="italic text-gray-700 font-bold">{user.name}
          <button className="absolute right-2 top-1 text-2xl  hover:scale-150 transition-all duration-300 " onClick={onFavorite}>+</button>
        </h2>
        <p className="text-black" >Username: {user.username}</p>
        <p className="text-black" >Email: {user.email}</p>
        <p className="text-black" >Phone: {user.phone}</p>
        {isFavorite && <FontAwesomeIcon  icon={faHeart}/>}
      </div>
      
      
      <div className="flex items-center justify-center w-full">
     
       <Link className=" transform translate-y-10 absolute bottom-0 group-hover:translate-y-[-10] transition-all duration-300 bg-black text-white w-full text-center font-bold" href={`/users/${user.id}`}> 
       Kullanıcıyı Görüntüle
       </Link>

       
      </div>
    </div>
  );
};

export default UserCard;

