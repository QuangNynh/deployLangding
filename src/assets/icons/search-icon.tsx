import * as React from 'react';

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle cx={11} cy={11} r={7} stroke="#FAF8F8" strokeWidth={2} />
            <path d="M20 20l-3-3" stroke="#FAF8F8" strokeWidth={2} strokeLinecap="round" />
        </svg>
    );
}

export default SearchIcon;
