import {FC} from "react";
import './User.css';
import IUser from "@/models/IUser";
import Link from "next/link";

type UserType = {
    user: IUser;
};

export const User: FC<UserType> = ({user}) => {

    return (
        <Link href={`/users/${user.id}`} className='user'>
            <p>{user.id} {user.firstName} {user.lastName}</p>
        </Link>
    );
}