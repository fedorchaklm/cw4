'use client';

import {FC} from "react";
// import {useSearchParams} from "react-router";
import './Pagination.css';
import {usePathname, useRouter, useSearchParams} from "next/navigation";

type PaginationType = {
    maxPages: number;
};

export const Pagination: FC<PaginationType> = ({maxPages}) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    // const [query, setQuery] = useSearchParams({page: '1'});
    // const currentPage = Number(query.get('page'));
    const currentPage = Number(searchParams.get('page')) || 1;


    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const handleOnClickPrev = () => {
        const newPageValue = currentPage - 1;
        const url = createPageURL(newPageValue < 1 ? '1' : newPageValue);
        replace(url);
        // const newPageValue = currentPage - 1;
        // setQuery({
        //     ...Object.fromEntries(query.entries()),
        //     page: newPageValue < 1 ? '1' : newPageValue.toString()
        // });
    }

    const handleOnClickNext = () => {
        const newPageValue = currentPage + 1;
        const url = createPageURL(newPageValue >= maxPages ? maxPages : newPageValue);
        replace(url);
        // const newPageValue = currentPage + 1;
        // setQuery({
        //     ...Object.fromEntries(query.entries()),
        //     page: newPageValue >= maxPages ? maxPages.toString() : newPageValue.toString()
        // });

    }

    return (
        <div className='pagination'>
            <button className={currentPage <= 1 ? 'disabledPaginationBtn' : 'paginationBtn'}
                    onClick={handleOnClickPrev}>prev
            </button>
            <p className='text-2xl text-white'>{currentPage}/{maxPages}</p>
            <button className={currentPage >= maxPages ? 'disabledPaginationBtn' : 'paginationBtn'}
                    onClick={handleOnClickNext}>next
            </button>
        </div>
    );
}

