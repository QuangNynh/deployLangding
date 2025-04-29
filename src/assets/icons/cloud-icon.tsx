import * as React from 'react';

function CloudIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width={49}
            height={48}
            viewBox="0 0 49 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M11 37.5c-4.5 0-9.5-2.5-9.5-8.5s4.333-8.166 6.5-8.5c0-1.333 0-4 3-5.5s5.333.167 6.5 1c3-6 8.5-9.1 15-6.5 6.5 2.6 8 10.167 7 12 2.667.334 8 2.5 8 8.5s-5 7.5-9.5 7.5"
                stroke="red"
                strokeWidth={2}
                strokeLinecap="round"
            />
            <circle cx={13.5} cy={44} r={3} stroke="red" strokeWidth={2} />
            <circle cx={24.5} cy={44} r={3} stroke="red" strokeWidth={2} />
            <circle cx={35.5} cy={44} r={3} stroke="red" strokeWidth={2} />
            <path
                d="M13.5 41v-6.017a11 11 0 012.55-7.042L18.5 25M24.5 41V24.5M35.5 41v-6.936a7 7 0 00-1.656-4.521L30 25"
                stroke="red"
                strokeWidth={2}
                strokeLinecap="round"
            />
        </svg>
    );
}

export default CloudIcon;
