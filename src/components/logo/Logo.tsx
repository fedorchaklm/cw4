import {FC} from "react";
import './Logo.css';
import Image from "next/image";

type LogoType = {
    img: string;
    alt: string;
};

const Logo: FC<LogoType> = ({img, alt}) => {
    return (
        <Image className="logo" src={img} alt={alt} width={40} height={40}/>
    );
};

export default Logo;
