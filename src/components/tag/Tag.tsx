'use client';

import {FC} from "react";
import './Tag.css';
import {usePathname, useRouter, useSearchParams} from "next/navigation";

type TagType = {
    tag: string;
};

const Tag: FC<TagType> = ({tag}) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    // const [query, setQuery] = useSearchParams();
    const onClick = () => {
        // setQuery({...Object.fromEntries(query.entries()), page: '1', tag: tag});
        const params = new URLSearchParams();
        console.log(tag);
        params.set('page', '1');
        params.set('tag', tag);

        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <button className={searchParams.get('tag') === tag ? 'tagBtn active' : 'tagBtn'}
                onClick={onClick}>#{tag}</button>
    );
};

export default Tag;