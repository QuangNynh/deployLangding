import * as React from 'react';

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
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
                d="M20.626 2.625H3.376a.75.75 0 00-.75.75v17.25c0 .415.335.75.75.75h17.25a.75.75 0 00.75-.75V3.375a.75.75 0 00-.75-.75zM18.46 8.098h-1.498c-1.174 0-1.401.557-1.401 1.378v1.807h2.803l-.366 2.829h-2.437v7.263h-2.923v-7.26h-2.444v-2.832h2.444V9.197c0-2.421 1.479-3.74 3.64-3.74 1.036 0 1.924.077 2.184.112v2.529h-.002z"
                fill="currentColor"
            />
        </svg>
    );
}

export default FacebookIcon;
