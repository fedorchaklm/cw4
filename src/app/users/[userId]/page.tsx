import {Metadata} from "next";
import {FC} from "react";
import {UserDetails} from "@/components/user-details/UserDetails";

export const metadata: Metadata = {
    title: 'User page',
    description: 'User page description'
};

type UserPage = {
    params: Promise<{ userId: string }>
};

const UserPage: FC<UserPage> = async ({params}) => {
    const {userId} = await params;
    console.log('>', userId);
    return (
        <UserDetails userId={userId}/>
    );
};

export default UserPage;