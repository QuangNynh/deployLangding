import React from 'react';

interface ButtonRedProps {
    children: React.ReactNode;
    className?: string;
    [key: string]: any;
}

const ButtonRed: React.FC<ButtonRedProps> = ({
    children,
    className,
    ...props
}) => {
    return (
        <div className="relative">
            <div className="absolute inset-0 z-10 rounded-full bg-gradient-to-r from-[#FF4D4D] to-[#CC0000] p-4 blur-[4px]"></div>
            <div
                className="button-custom z-10"
              
            >
                <button className="flip-button w-full" {...props}>
                    <span
                        className={` ${className} flex cursor-pointer items-center justify-center rounded-full px-4 text-[16px] font-semibold md:text-[20px]`}
                    >
                        {children}
                    </span>
                </button>
            </div>
        </div>
    );
};
export default ButtonRed;
