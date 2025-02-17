import {FC} from "react";
import IUser from "@/models/IUser";
import User from "@/components/user/User";
import './UserList.css';

type UsersListType = {
    users: Array<IUser>;
};

const UsersList: FC<UsersListType> = async ({users}) => {

    return (
        <div className='list-wrap'>
            <div className='flex flex-col items-center gap-2 my-2 w-1/3 text-black'>
                <h1 className='text-3xl text-white'>Users:</h1>
                {users.map((user: IUser) => <User key={user.id} user={user}/>)}
            </div>
        </div>
    );
};

export default UsersList;