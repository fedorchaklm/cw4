import Menu from "@/components/menu/Menu";
import Link from "next/link";
import Image from 'next/image';
import {getCookie} from "cookies-next";
import {cookies} from "next/headers";
// import {authService} from "@/services/auth.api.service";

const Home = async () => {
    const cookie = await getCookie('currentUser', {cookies}) as string;
    console.log({cookie});
    let currentUser;
    if (cookie) {
        currentUser = JSON.parse(cookie);
    }
    // const currentUser = await authService.getCurrentAuthUser();

    return (

        <div className='flex flex-col'>
            <Menu/>
            {currentUser ?
                <div
                    className='text-white text-3xl flex flex-col justify-center items-center w-full m-auto gap-8 px-4 mt-20 max-w-xl text-center'>
                    <Image src='/assets/burger.jpg' alt='burger' className='rounded-circle' width={300} height={300}/>
                    <h1>Welcome to our site – Ultimate Recipe Collection!</h1>
                    <p className='text-2xl'>Looking for delicious recipes? You’ve come to the right place! Here you’ll
                        find a collection of mouthwatering recipes and chefs sharing their passion for food.</p>
                </div>
                :
                <div className='flex flex-col items-center gap-4 mt-40'>
                    <p className='bg-white text-black text-3xl px-4 py-4 rounded-xl text-center'>You
                        need to authenticate</p>
                    <Link href={'/login'}
                          className='bg-white text-black text-3xl px-4 py-4 rounded-xl text-center'>Login</Link>
                </div>}
        </div>
    );
};

export default Home;