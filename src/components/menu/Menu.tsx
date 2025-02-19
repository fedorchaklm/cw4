import './Menu.css';
import Link from "next/link";
import Logo from "@/components/logo/Logo";
import {getCurrentUser} from "@/helpers/helpers";

const Menu = async () => {
    const currentUser = await getCurrentUser();

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