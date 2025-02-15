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

    const onClick = () => {
        const params = new URLSearchParams();
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