export default function Home() {
    const currentUser = true;

    return (
        currentUser ?
            <div className='text-white text-3xl flex flex-col items-center gap-8 px-4 mt-20 max-w-xl text-center'>
                <img src={'/assets/burger.jpg'} alt='burger' className='rounded-circle' />
                <h1>Welcome to our site – Ultimate Recipe Collection!</h1>
                <p className='text-2xl'>Looking for delicious recipes? You’ve come to the right place! Here you’ll find
                    a collection of mouthwatering recipes and chefs sharing their passion for food.</p>
            </div> :
            <p className='my-40 bg-white text-black text-3xl px-4 py-4 rounded-xl text-center'>You
                need to authenticate</p>
    );
}
