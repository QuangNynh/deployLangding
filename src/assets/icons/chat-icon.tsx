import * as React from 'react';

function ChatIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M5.33398 16C5.33398 14.4518 5.33398 13.6777 5.42901 13.0289C6.00531 9.09454 9.09522 6.00464 13.0296 5.42834C13.6783 5.33331 14.4524 5.33331 16.0007 5.33331V5.33331C17.5489 5.33331 18.323 5.33331 18.9717 5.42834C22.9061 6.00464 25.996 9.09454 26.5723 13.0289C26.6673 13.6777 26.6673 14.4518 26.6673 16V22.7879C26.6673 24.5558 26.6673 25.4398 26.1472 26.012C26.1045 26.0589 26.0596 26.1038 26.0126 26.1465C25.4405 26.6666 24.5565 26.6666 22.7885 26.6666H16.0007C14.4524 26.6666 13.6783 26.6666 13.0296 26.5716C9.09522 25.9953 6.00531 22.9054 5.42901 18.971C5.33398 18.3223 5.33398 17.5482 5.33398 16V16Z"
                stroke="#FAF8F8"
                strokeWidth="2"
            />
            <path
                d="M12 14.6667L20 14.6667"
                stroke="#FAF8F8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M16 20H20"
                stroke="#FAF8F8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default ChatIcon;
