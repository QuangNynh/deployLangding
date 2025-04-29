import * as React from 'react';
interface BagIconProps extends React.SVGProps<SVGSVGElement> {
    color?: string; // Định nghĩa color là một prop tùy chọn
}

const BagIcon: React.FC<BagIconProps> = ({ color = '#FAF8F8', ...props }) => {
    return (
        <svg
            width={30}
            height={30}
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M10 10V8.75a5 5 0 015-5v0a5 5 0 015 5V10M18.75 17.5V15M11.25 17.5V15"
                stroke={`${color || '#FAF8F8'}`}
                strokeWidth={3}
                strokeLinecap="round"
            />
            <path
                d="M5 14c0-1.886 0-2.828.586-3.414C6.172 10 7.114 10 9 10h12c1.886 0 2.828 0 3.414.586C25 11.172 25 12.114 25 14v4.25c0 3.771 0 5.657-1.172 6.828C22.657 26.25 20.771 26.25 17 26.25h-4c-3.771 0-5.657 0-6.828-1.172C5 23.907 5 22.021 5 18.25V14z"
                stroke={`${color || '#FAF8F8'}`}
                strokeWidth={3}
            />
        </svg>
    );
};

export default BagIcon;
