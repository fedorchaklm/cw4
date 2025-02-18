import './Menu.css';
import Link from "next/link";
import {getCookie} from "cookies-next";
import {cookies} from "next/headers";
import Logo from "@/components/logo/Logo";

const Menu = async () => {
    const res = await getCookie('currentUser', {cookies}) as string;
    console.log('menu', res);
    let currentUser;
    if (res) {
        currentUser = JSON.parse(res);
    }

    return (
        <div className='flex items-center justify-between'>
            <ul className='menu'>
                <li className='menu-item'>
                    <Link href='/login'>Login</Link>
                </li>
                {currentUser &&
                    <>
                        <li className='menu-item'>
                            <Link href='/'>Home</Link>
                        </li>
                        <li className='menu-item'>
                            <Link href='/users'>Users</Link>
                        </li>
                        <li className='menu-item'>
                            <Link href='/recipes'>Recipes</Link>
                        </li>
                    </>
                }
            </ul>
            <div className='px-4'>
                {currentUser && <Logo img={currentUser.image} alt={currentUser.lastName}/>}
            </div>
        </div>
    );
};

export default Menu;