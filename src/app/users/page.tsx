import {Metadata} from "next";
import {Menu} from "@/components/menu/Menu";
import UsersList from "@/components/users-list/UsersList";

export const metadata: Metadata = {
    title: 'Users page',
    description: 'Users page description'
};

const UsersPage = async () => {
    return (
        <div className='flex flex-col'>
            <Menu/>
            <UsersList/>
        </div>
    );
};

export default UsersPage;