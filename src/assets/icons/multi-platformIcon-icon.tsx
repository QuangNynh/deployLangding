import * as React from 'react';

function MultiPlatformIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width={48}
            height={48}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M3 12h19v27a1 1 0 01-1 1H4a1 1 0 01-1-1V12z" stroke="red" strokeWidth={2} />
            <path
                d="M7 16a1 1 0 011-1h9a1 1 0 011 1v4H7v-4zM7 20h11v4a1 1 0 01-1 1H8a1 1 0 01-1-1v-4z"
                stroke="red"
                strokeWidth={2}
            />
            <circle cx={12.5} cy={30.5} r={1.5} fill="red" />
            <circle cx={12.5} cy={34.5} r={1.5} fill="red" />
            <path
                d="M3 11l2.7-3.6a1 1 0 01.8-.4h12a1 1 0 01.8.4L22 11M25 26l7.293 7.293M25 19.293L32.293 12"
                stroke="red"
                strokeWidth={2}
                strokeLinecap="round"
            />
            <path
                d="M35 8a1 1 0 011-1h8a1 1 0 011 1v6a1 1 0 01-1 1h-8a1 1 0 01-1-1V8zM35 30a1 1 0 011-1h8a1 1 0 011 1v6a1 1 0 01-1 1h-8a1 1 0 01-1-1v-6z"
                stroke="red"
                strokeWidth={2}
            />
            <path
                d="M37 18h3m3 0h-3m0 0v-3M37 40h3m3 0h-3m0 0v-3"
                stroke="red"
                strokeWidth={2}
                strokeLinecap="round"
            />
        </svg>
    );
}

export default MultiPlatformIcon;
