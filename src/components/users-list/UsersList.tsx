import {FC} from "react";
import {userService} from "@/services/user.api.service";
import IUser from "@/models/IUser";
import User from "@/components/user/User";
import Pagination from "@/components/pagination/Pagination";
import {getMaxPages} from "@/helpers/helpers";
import {limitOfUsersByPage} from "@/constants/constants";
import Search from "@/components/search/Search";
import './UserList.css';
import NotFound from "../not-found/NotFound";

const UsersList: FC = async () => {
    const users = await userService.getUsersByPage(1, '');

    return (
        <div className='list-wrap'>
            <Search/>
            {users ?
                <div className='flex flex-col items-center gap-2 my-2 w-1/3 text-black'>
                    <h1 className='text-3xl text-white'>Users:</h1>
                    {users && users.users.map((user: IUser) => <User key={user.id} user={user}/>)}
                    <Pagination maxPages={getMaxPages(users.total, limitOfUsersByPage)}/>
                </div>
                : <NotFound/>}
        </div>
    );
};

export default UsersList;