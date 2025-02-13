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
        mode: 'all'
    });
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const submit = (searchData: SearchDataType) => {
        console.log(searchData);
        const params = new URLSearchParams(searchParams);
        if (searchData) {
            params.set('search', searchData.search);
        } else {
            params.delete('search');
        }
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
                <input type='search' id='search' placeholder='Search...' {...register('search')} required defaultValue={searchParams.get('search')?.toString()}/>
                <button type='submit' className='searchBtn'>Search</button>
            </div>
        </form>
    );
}