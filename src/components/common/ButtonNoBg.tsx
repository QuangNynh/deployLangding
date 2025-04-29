import React from 'react';

interface ButtonNoBgProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const ButtonNoBg: React.FC<ButtonNoBgProps> = ({ children, className, onClick }) => {
    return (
        <div className="relative" onClick={onClick}>
            <div className="absolute inset-0 z-10 rounded-full p-4 blur-[4px] group-hover:bg-gradient-to-r group-hover:from-[#FF4D4D] group-hover:to-[#CC0000]"></div>
            <div className="button-custom-no-bg z-10">
                <span
                    className={` ${className} flex cursor-pointer items-center justify-center rounded-full px-4 text-[16px] font-semibold md:text-[20px]`}
                >
                    {children}
                </span>
            </div>
        </div>
    );
};

export default ButtonNoBg;
