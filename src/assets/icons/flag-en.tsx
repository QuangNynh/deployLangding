import * as React from 'react';

function FlagEn(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width={32}
            height={24}
            viewBox="0 0 32 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <mask
                id="a"
                style={{
                    maskType: 'luminance',
                }}
                maskUnits="userSpaceOnUse"
                x={0}
                y={0}
                width={32}
                height={24}
            >
                <path fill="#fff" d="M0 0H32V24H0z" />
            </mask>
            <g mask="url(#a)">
                {/* Background with 13 stripes (7 red, 6 white) */}
                <path fill="#fff" d="M0 0H32V24H0z" />
                <path fill="#B22234" d="M0 0H32V1.846H0z" />
                <path fill="#B22234" d="M0 3.692H32V5.538H0z" />
                <path fill="#B22234" d="M0 7.385H32V9.231H0z" />
                <path fill="#B22234" d="M0 11.077H32V12.923H0z" />
                <path fill="#B22234" d="M0 14.769H32V16.615H0z" />
                <path fill="#B22234" d="M0 18.462H32V20.308H0z" />
                <path fill="#B22234" d="M0 22.154H32V24H0z" />

                {/* Blue rectangle in the top-left corner */}
                <path fill="#3C3B6E" d="M0 0H16V13.846H0z" />

                {/* 50 stars (simplified as 5 rows of stars) - adjusted position */}
                {/* Row 1: 6 stars */}
                <path
                    d="M1.6 1.2L2 2.0L2.9 2.0L2.2 2.5L2.5 3.3L1.6 2.8L0.7 3.3L1 2.5L0.3 2.0L1.2 2.0L1.6 1.2Z"
                    fill="white"
                />
                <path
                    d="M4.8 1.2L5.2 2.0L6.1 2.0L5.4 2.5L5.7 3.3L4.8 2.8L3.9 3.3L4.2 2.5L3.5 2.0L4.4 2.0L4.8 1.2Z"
                    fill="white"
                />
                <path
                    d="M8 1.2L8.4 2.0L9.3 2.0L8.6 2.5L8.9 3.3L8 2.8L7.1 3.3L7.4 2.5L6.7 2.0L7.6 2.0L8 1.2Z"
                    fill="white"
                />
                <path
                    d="M11.2 1.2L11.6 2.0L12.5 2.0L11.8 2.5L12.1 3.3L11.2 2.8L10.3 3.3L10.6 2.5L9.9 2.0L10.8 2.0L11.2 1.2Z"
                    fill="white"
                />
                <path
                    d="M14.4 1.2L14.8 2.0L15.7 2.0L15 2.5L15.3 3.3L14.4 2.8L13.5 3.3L13.8 2.5L13.1 2.0L14 2.0L14.4 1.2Z"
                    fill="white"
                />

                {/* Row 2: 5 stars */}
                <path
                    d="M3.2 3.7L3.6 4.5L4.5 4.5L3.8 5.0L4.1 5.8L3.2 5.3L2.3 5.8L2.6 5.0L1.9 4.5L2.8 4.5L3.2 3.7Z"
                    fill="white"
                />
                <path
                    d="M6.4 3.7L6.8 4.5L7.7 4.5L7 5.0L7.3 5.8L6.4 5.3L5.5 5.8L5.8 5.0L5.1 4.5L6 4.5L6.4 3.7Z"
                    fill="white"
                />
                <path
                    d="M9.6 3.7L10 4.5L10.9 4.5L10.2 5.0L10.5 5.8L9.6 5.3L8.7 5.8L9 5.0L8.3 4.5L9.2 4.5L9.6 3.7Z"
                    fill="white"
                />
                <path
                    d="M12.8 3.7L13.2 4.5L14.1 4.5L13.4 5.0L13.7 5.8L12.8 5.3L11.9 5.8L12.2 5.0L11.5 4.5L12.4 4.5L12.8 3.7Z"
                    fill="white"
                />

                {/* Row 3: 6 stars */}
                <path
                    d="M1.6 6.2L2 7.0L2.9 7.0L2.2 7.5L2.5 8.3L1.6 7.8L0.7 8.3L1 7.5L0.3 7.0L1.2 7.0L1.6 6.2Z"
                    fill="white"
                />
                <path
                    d="M4.8 6.2L5.2 7.0L6.1 7.0L5.4 7.5L5.7 8.3L4.8 7.8L3.9 8.3L4.2 7.5L3.5 7.0L4.4 7.0L4.8 6.2Z"
                    fill="white"
                />
                <path
                    d="M8 6.2L8.4 7.0L9.3 7.0L8.6 7.5L8.9 8.3L8 7.8L7.1 8.3L7.4 7.5L6.7 7.0L7.6 7.0L8 6.2Z"
                    fill="white"
                />
                <path
                    d="M11.2 6.2L11.6 7.0L12.5 7.0L11.8 7.5L12.1 8.3L11.2 7.8L10.3 8.3L10.6 7.5L9.9 7.0L10.8 7.0L11.2 6.2Z"
                    fill="white"
                />
                <path
                    d="M14.4 6.2L14.8 7.0L15.7 7.0L15 7.5L15.3 8.3L14.4 7.8L13.5 8.3L13.8 7.5L13.1 7.0L14 7.0L14.4 6.2Z"
                    fill="white"
                />

                {/* Row 4: 5 stars */}
                <path
                    d="M3.2 8.7L3.6 9.5L4.5 9.5L3.8 10.0L4.1 10.8L3.2 10.3L2.3 10.8L2.6 10.0L1.9 9.5L2.8 9.5L3.2 8.7Z"
                    fill="white"
                />
                <path
                    d="M6.4 8.7L6.8 9.5L7.7 9.5L7 10.0L7.3 10.8L6.4 10.3L5.5 10.8L5.8 10.0L5.1 9.5L6 9.5L6.4 8.7Z"
                    fill="white"
                />
                <path
                    d="M9.6 8.7L10 9.5L10.9 9.5L10.2 10.0L10.5 10.8L9.6 10.3L8.7 10.8L9 10.0L8.3 9.5L9.2 9.5L9.6 8.7Z"
                    fill="white"
                />
                <path
                    d="M12.8 8.7L13.2 9.5L14.1 9.5L13.4 10.0L13.7 10.8L12.8 10.3L11.9 10.8L12.2 10.0L11.5 9.5L12.4 9.5L12.8 8.7Z"
                    fill="white"
                />

                {/* Row 5: 6 stars */}
                <path
                    d="M1.6 11.2L2 12.0L2.9 12.0L2.2 12.5L2.5 13.3L1.6 12.8L0.7 13.3L1 12.5L0.3 12.0L1.2 12.0L1.6 11.2Z"
                    fill="white"
                />
                <path
                    d="M4.8 11.2L5.2 12.0L6.1 12.0L5.4 12.5L5.7 13.3L4.8 12.8L3.9 13.3L4.2 12.5L3.5 12.0L4.4 12.0L4.8 11.2Z"
                    fill="white"
                />
                <path
                    d="M8 11.2L8.4 12.0L9.3 12.0L8.6 12.5L8.9 13.3L8 12.8L7.1 13.3L7.4 12.5L6.7 12.0L7.6 12.0L8 11.2Z"
                    fill="white"
                />
                <path
                    d="M11.2 11.2L11.6 12.0L12.5 12.0L11.8 12.5L12.1 13.3L11.2 12.8L10.3 13.3L10.6 12.5L9.9 12.0L10.8 12.0L11.2 11.2Z"
                    fill="white"
                />
                <path
                    d="M14.4 11.2L14.8 12.0L15.7 12.0L15 12.5L15.3 13.3L14.4 12.8L13.5 13.3L13.8 12.5L13.1 12.0L14 12.0L14.4 11.2Z"
                    fill="white"
                />
            </g>
        </svg>
    );
}

export default FlagEn;
