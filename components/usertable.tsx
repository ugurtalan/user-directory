import React, { Children } from "react";

interface UserTableProps{
    children : React.ReactNode;
}

 const UserTable: React.FC<UserTableProps> = ({children})=>{
    return(
        <div className=" flex flex-row flex-wrap flex-shrink py-10   ">

{children}
        </div> 

    );

}

export default UserTable;
