import * as React from 'react';

function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
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
                d="M9 19l7-7-7-7"
                stroke="#2C2C2C"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default ChevronRight;
