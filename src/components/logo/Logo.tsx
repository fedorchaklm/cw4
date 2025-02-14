import {FC} from "react";
import './Logo.css';

type LogoType = {
    img: string;
    alt: string;
};

const Logo: FC<LogoType> = ({img, alt}) => {
    return (
        <img className="logo" src={img} alt={alt}/>
    );
};

export default Logo;
