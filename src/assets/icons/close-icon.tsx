import * as React from 'react';

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M2.60195 21.5001L0.501953 19.4001L8.90195 11.0001L0.501953 2.60006L2.60195 0.500061L11.002 8.90006L19.402 0.500061L21.502 2.60006L13.102 11.0001L21.502 19.4001L19.402 21.5001L11.002 13.1001L2.60195 21.5001Z"
                fill={props.color || '#D6D6D6'}
                // fillOpacity="0.48"
            />
        </svg>
    );
}

export default CloseIcon;
