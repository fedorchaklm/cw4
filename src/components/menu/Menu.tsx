import './Menu.css';
import Link from "next/link";
import {userService} from "@/services/user.api.service";
import Logo from "@/components/logo/Logo";
// import {Logo} from "@/components/logo/Logo";

export const Menu = async () => {
    const currentUser = await userService.getCurrentAuthUser();
    console.log(currentUser);

    return (
        <div className='flex items-center justify-between'>
            <ul className='menu'>
                <li className='menu-item'>
                    <Link href='/login'>Login</Link>
                </li>
                <li className='menu-item'>
                    <Link href='/'>Home</Link>
                </li>
                <li className='menu-item'>
                    <Link href='/users'>Users</Link>
                </li>
                <li className='menu-item'>
                    <Link href='/recipes'>Recipes</Link>
                </li>
            </ul>
            <div className='px-4'>
                <Logo img={currentUser.image} alt={currentUser.lastName}/>
            </div>
        </div>
    );
}