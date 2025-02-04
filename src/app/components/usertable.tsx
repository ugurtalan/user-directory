import React, { Children } from "react";

interface UserTableProps{
    children : React.ReactNode;
}

 const UserTable: React.FC<UserTableProps> = ({children})=>{
    return(
        <div className=" flex flex-wrap  py-10 space-y-0.5">

{children}
        </div>

    );

}

export default UserTable;
