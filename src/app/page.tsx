import Menu from "@/components/menu/Menu";
import Image from 'next/image';
import {getCurrentUser} from "@/helpers/helpers";

const Home = async () => {
    const currentUser = await getCurrentUser();

    return (

        <div className='flex flex-col'>
            <Menu/>
            {currentUser ?
                <div
                    className='text-white text-3xl flex flex-col justify-center items-center w-full m-auto gap-8 px-4 mt-20 max-w-xl text-center'>
                    <Image src='/assets/burger.jpg' alt='burger' width={1000} height={1000}/>
                    <h1>Welcome to our site – Ultimate Recipe Collection!</h1>
                    <p className='text-2xl'>Looking for delicious recipes? You’ve come to the right place! Here you’ll
                        find a collection of mouthwatering recipes and chefs sharing their passion for food.</p>
                </div>
                :
                <div className='flex flex-col items-center gap-4 mt-40'>
                    <p className='bg-white text-black text-3xl px-4 py-4 rounded-xl text-center'>You
                        need to authenticate</p>
                </div>}
        </div>
    );
};

export default Home;