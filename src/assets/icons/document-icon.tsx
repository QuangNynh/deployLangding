import * as React from 'react';
interface DocumentIconProps extends React.SVGProps<SVGSVGElement> {
    color?: string; // Định nghĩa color là một prop tùy chọn
}

const DocumentIcon: React.FC<DocumentIconProps> = ({ color = '#FAF8F8', ...props }) => {
    return (
        <svg
            width={30}
            height={30}
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M15.5 5c1.404 0 2.107 0 2.611.337a2 2 0 01.552.552C19 6.393 19 7.096 19 8.5V18c0 1.886 0 2.828-.586 3.414C17.828 22 16.886 22 15 22H9c-1.886 0-2.828 0-3.414-.586C5 20.828 5 19.886 5 18V8.5c0-1.404 0-2.107.337-2.611a2 2 0 01.552-.552C6.393 5 7.096 5 8.5 5"
                stroke={`${color || '#FAF8F8'}`}
                strokeWidth={3}
            />
            <path
                d="M9 5a2 2 0 012-2h2a2 2 0 110 4h-2a2 2 0 01-2-2z"
                stroke={`${color || '#FAF8F8'}`}
                strokeWidth={3}
            />
            <path
                d="M9 12h6M9 16h4"
                stroke={`${color || '#FAF8F8'}`}
                strokeWidth={3}
                strokeLinecap="round"
            />
        </svg>
    );
};

export default DocumentIcon;
