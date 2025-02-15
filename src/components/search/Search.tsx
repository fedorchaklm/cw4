'use client';

import {useForm} from "react-hook-form";
import {FC} from "react";
import './Search.css';
import {useSearchParams, usePathname, useRouter} from "next/navigation";

type SearchDataType = {
    search: string
};

// type SearchType = {
//     onSubmit: (searchData: SearchDataType) => void;
// };

export const Search: FC = () => {
    const {register, handleSubmit, reset} = useForm<SearchDataType>({
        mode: 'onChange'
    });
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const submit = (searchData: SearchDataType) => {
        console.log(searchData);
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (searchData) {
            params.set('q', searchData.search);
        } else {
            params.set('q', '');
        }
        console.log(`${pathname}?${params.toString()}`);
        replace(`${pathname}?${params.toString()}`);
        reset();
    };

    return (
        <form className='search' onSubmit={handleSubmit(submit)}>
            <label htmlFor='search' className='search-label'>Search</label>
            <div className='relative'>
                <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
                    <img className='search-img' src='/assets/search.svg' alt='Search'/>
                </div>
                <input type='search' id='search' placeholder='Search...' {...register('search')}
                       defaultValue={searchParams.get('search')?.toString()}/>
                <button type='submit' className='searchBtn'>Search</button>
            </div>
        </form>
    );
}

