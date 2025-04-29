import * as React from 'react';
interface UserIconProps extends React.SVGProps<SVGSVGElement> {
    color?: string; // Định nghĩa color là một prop tùy chọn
}

const UserIcon: React.FC<UserIconProps> = ({ color = '#FAF8F8', ...props }) => {
    return (
        <svg
            width={30}
            height={30}
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle
                cx={15}
                cy={8.75}
                r={5}
                stroke={`${color || '#FAF8F8'}`}
                strokeWidth={3}
                strokeLinecap="round"
            />
            <path
                d="M6.974 21.78c.824-2.75 3.548-4.28 6.419-4.28h3.214c2.871 0 5.595 1.53 6.42 4.28.32 1.067.583 2.256.682 3.471.044.55-.407.999-.959.999H7.25c-.552 0-1.003-.449-.959-.999.099-1.215.362-2.404.683-3.471z"
                stroke={`${color || '#FAF8F8'}`}
                strokeWidth={3}
                strokeLinecap="round"
            />
        </svg>
    );
};

export default UserIcon;
