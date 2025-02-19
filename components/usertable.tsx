import React  from "react";

interface UserTableProps{
    children : React.ReactNode;
}

 const UserTable: React.FC<UserTableProps> = ({children})=>{
    return(
        <div className="grid grid-cols-4 overflow-hidden">

{children}
        </div> 


    );

}

export default UserTable;
