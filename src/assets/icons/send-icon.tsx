import * as React from 'react';

function SendIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g clipPath="url(#clip0_1055_7931)">
                <path
                    d="M14.3724 1.42224L7.03906 8.75557M14.3724 1.42224L9.70573 14.7556L7.03906 8.75557M14.3724 1.42224L1.03906 6.08891L7.03906 8.75557"
                    stroke="#FAF8F8"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_1055_7931">
                    <rect width="16" height="16" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}

export default SendIcon;
