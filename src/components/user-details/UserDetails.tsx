import './UserDetails.css';
import {FC} from "react";
import {userService} from "@/services/user.api.service";
import IUser from "@/models/IUser";
import {formatDate} from "@/helpers/helpers";

type UserDetailsType = {
    userId: string;
};

export const UserDetails: FC<UserDetailsType> = async ({userId}) => {
    const user: IUser = await userService.getUserById(userId);
    console.log('>', user);

    return (
        <div className='user-wrap'>
            <div className='flex flex-col sm:flex-row justify-center gap-10'>
                <div>
                    <img className='w-80 min-w-20' src={user.image} alt={user.lastName}/>
                </div>
                <div className='flex flex-col gap-4 px-4'>
                    <h1 className='text-3xl'>Information about {user.firstName} {user.lastName}</h1>
                    <p>Username: {user.username}</p>
                    <p>Age: {user.age}</p>
                    <p>Gender: {user.gender}</p>
                    <p>Birthdate: {formatDate(user.birthDate)}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <p>Address: {user.address.stateCode}, {user.address.state}, {user.address.country}, {user.address.city}, {user.address.address}</p>
                    <hr className='h-px my-8 bg-white border-0'/>
                </div>
            </div>
            {/*<div className='flex flex-col justify-center gap-10 w-full px-4'>*/}
            {/*    <h2 className='text-2xl'>{user.firstName}`s recipes:</h2>*/}
            {/*    {userRecipes.length > 0 ? userRecipes.map((recipe: IRecipe) =>*/}
            {/*        <Recipe key={recipe.id} recipe={recipe}/>) : <p>No recipes yet</p>}*/}
            {/*</div>*/}
        </div>
    );
}