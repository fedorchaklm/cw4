import {Metadata} from "next";
import {FC} from "react";
import UserDetails from "@/components/user-details/UserDetails";
import Menu from "@/components/menu/Menu";

type UserPageType = {
    params: Promise<{ userId: string }>
};

export const generateMetadata = async ({params}: UserPageType): Promise<Metadata> => {
    const {userId} = await params;

    return {
        title: `User page ${userId} `,
        description: 'User page description'
    }
};

const UserPage: FC<UserPageType> = async ({params}) => {
    const {userId} = await params;
    console.log('>', userId);
    return (
        <>
            <Menu/>
            <UserDetails userId={userId}/>
        </>
    );
};

export default UserPage;