import './Menu.css';
import Link from "next/link";
// import {Logo} from "@/components/logo/Logo";

export const Menu = () => {
    const currentUser = true;

    if (!currentUser) {
        return (
            <ul className='menu'>
                <li className='menu-item'>
                    <Link href='/login'>Login</Link>
                </li>
            </ul>
        );
    }

    return (
        <div className='flex items-center justify-between'>
            <ul className='menu'>
                <li className='menu-item'>
                    <Link href='/login'>Login</Link>
                </li>
                <li className='menu-item'>
                    <Link href='/users'>Users</Link>
                </li>
                <li className='menu-item'>
                    <Link href='/recipes'>Recipes</Link>
                </li>
            </ul>
            <div className='px-4'>
                {/*<Logo img={currentUser.image} alt={currentUser.lastName}/>*/}
            </div>
        </div>
    );
}