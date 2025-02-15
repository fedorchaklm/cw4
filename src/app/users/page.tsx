import {Metadata} from "next";
import {Menu} from "@/components/menu/Menu";
import {FC} from "react";
import {Search} from "@/components/search/Search";
import IUser from "@/models/IUser";
import {User} from "@/components/user/User";
import {Pagination} from "@/components/pagination/Pagination";
import {getMaxPages} from "@/helpers/helpers";
import {limitOfUsersByPage} from "@/constants/constants";
import {NotFound} from "@/components/not-found/NotFound";
import {userService} from "@/services/user.api.service";

export const metadata: Metadata = {
    title: 'Users page',
    description: 'Users page description'
};

type UsersPageType = {
    searchParams: Promise<{ [key: string]: string | undefined }>
};

const UsersPage: FC<UsersPageType> = async ({searchParams}) => {
    const sp = await searchParams;
    console.log({sp});
    const page = sp?.page || 1;
    const q = sp?.search || '';
    const users = await userService.getUsersByPage(Number(page), q);

    return (
        <div className='flex flex-col'>
            <Menu/>
            <div className='flex flex-col items-center gap-2 py-2 w-full text-xl'>
                <Search/>
                {users ?
                    <div className='flex flex-col items-center gap-2 my-2 w-1/3 text-black'>
                        <h1 className='text-3xl text-white'>Users:</h1>
                        {users && users.users.map((user: IUser) => <User key={user.id} user={user}/>)}
                        <Pagination maxPages={getMaxPages(users.total, limitOfUsersByPage)}/>
                    </div>
                    : <NotFound/>}
            </div>
        </div>
    );
};

export default UsersPage;