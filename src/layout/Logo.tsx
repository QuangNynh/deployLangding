import Image from 'next/image';
import React, { HTMLAttributes } from 'react';

const LogoUrl = '/images/logo-test.png';

interface Props extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}

const Logo: React.FC<Props> = ({ className }) => {
    return (
        <div className={`relative aspect-square w-10 ${className || ''}`}>
            <Image src={LogoUrl} alt="logo-katech" fill className="object-center" />
        </div>
    );
};

export default Logo;
