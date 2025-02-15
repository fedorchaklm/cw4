import {userService} from "@/services/user.api.service";
import Menu from "@/components/menu/Menu";
import Link from "next/link";
import Image from 'next/image';

export default async function Home() {
    const currentUser = await userService.getCurrentAuthUser();

    return (
        currentUser ?
            <div className='flex flex-col'>
                <Menu/>
                <div
                    className='text-white text-3xl flex flex-col justify-center items-center w-full m-auto gap-8 px-4 mt-20 max-w-xl text-center'>
                    <Image src='/assets/burger.jpg' alt='burger' className='rounded-circle' width={200} height={100}/>
                    <h1>Welcome to our site – Ultimate Recipe Collection!</h1>
                    <p className='text-2xl'>Looking for delicious recipes? You’ve come to the right place! Here you’ll
                        find
                        a collection of mouthwatering recipes and chefs sharing their passion for food.</p>
                </div>
            </div>
            :
            <div className='flex justify-center'>
                <Link href={'/login'}
                      className='my-40 bg-white text-black text-3xl px-4 py-4 rounded-xl text-center'>You
                    need to authenticate</Link>
            </div>
    );
};
