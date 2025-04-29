import * as React from 'react';

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M5 7h14M5 12h14M5 17h14"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                className="text-gray-700 dark:text-gray-300"
            />
        </svg>
    );
}

export default MenuIcon;
