import {Metadata} from "next";
import {UsersList} from "@/components/users-list/UsersList";

export const metadata: Metadata = {
    title: 'Users page',
    description: 'Users page description'
};

const UsersPage = async () => {
    return (
        <UsersList/>
    );
};

export default UsersPage;