import {Metadata} from "next";
import Menu from "@/components/menu/Menu";
import {FC} from "react";
import Search from "@/components/search/Search";
import Pagination from "@/components/pagination/Pagination";
import {getMaxPages} from "@/helpers/helpers";
import {limitOfUsersByPage} from "@/constants/constants";
import NotFound from "@/components/not-found/NotFound";
import {userService} from "@/services/user.api.service";
import UsersList from "@/components/users-list/UsersList";

export const metadata: Metadata = {
    title: 'Users page',
    description: 'Users page description'
};

type UsersPageType = {
    searchParams: Promise<{ [key: string]: string | undefined }>;
};

const UsersPage: FC<UsersPageType> = async ({searchParams}) => {
    const sp = await searchParams;
    const page = sp?.page || 1;
    const q = sp?.q || '';
    const users = await userService.getUsersByPage(Number(page), q);

    return (
        <div className='flex flex-col'>
            <Menu/>
            <div className='flex flex-col items-center gap-2 py-2 w-full text-xl'>
                <Search/>
                {users?.users.length > 0 ?
                    <>
                        <UsersList users={users.users}/>
                        <Pagination maxPages={getMaxPages(users.total, limitOfUsersByPage)}/>
                    </>
                    : <NotFound/>}
            </div>
        </div>
    );
};

export default UsersPage;