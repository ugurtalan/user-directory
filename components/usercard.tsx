import { User } from '../app/types';

type UserCardProps = {
  user: User;
  onFavorite: () => void;
  
  onClick: (userId: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick, onFavorite }) => {
  return (
    <div className="user-card border-2 border-black rounded-2xl  overflow-hidden w-60 h-48 bg-white shadow-md relative my-1 mx-4 hover:bg-slate-300 transition-all duration-300 cursor-default">
      <div className="p-4">
        <h2 className="italic text-gray-700 font-bold">{user.name}
          <button className="absolute right-2 top-1 text-2xl  hover:scale-150 transition-all duration-300 " onClick={onFavorite}>+</button>
        </h2>
        <p >Username: {user.username}</p>
        <p >Email: {user.email}</p>
        <p >Phone: {user.phone}</p>
      </div>
      <div className="flex items-center justify-center w-full">
        <button
          onClick={() => onClick(user.id)} 
          className="bg-black text-white w-full font-bold absolute bottom-0 opacity-80 hover:opacity-100 transition-all duration-500 ease-in-out 
       hover:translate-y-[-0px]  hover:pt-5 hover:rounded-t-xl transoverflow-hidden">
        
          Kullanıcıyı görüntüle
        </button>

       
      </div>
    </div>
  );
};

export default UserCard;
