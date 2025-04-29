import React, { useState, useRef, useEffect } from 'react';
import ChevronDown from '@/assets/icons/chevron-down';

interface SelectOption {
    value: string | number;
    label: string;
}

interface SelectProps {
    options: SelectOption[];
    value?: string | number;
    onChange: (value: string | number) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    name?: string;
}

const Select: React.FC<SelectProps> = ({
    options,
    value,
    onChange,
    placeholder = 'Select an option',
    className = '',
    disabled = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedLabel = options.find((option) => option.value === value)?.label || '';
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={`relative rounded-full ${className}`} ref={selectRef}>
            <div
                className={`flex cursor-pointer items-center justify-between gap-2 rounded-full border border-gray-300 bg-white py-2.5 pr-7 pl-5 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <input
                    type="text"
                    value={selectedLabel}
                    placeholder={placeholder}
                    readOnly
                    className="w-full cursor-pointer bg-transparent focus:outline-none dark:text-white dark:placeholder-gray-400"
                />
                <ChevronDown className="pointer-events-none h-3 w-3 text-gray-400 dark:text-gray-200" />
            </div>
            {isOpen && (
                <ul
                    style={{ paddingLeft: '0px' }}
                    className="absolute top-8 left-0 z-20 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className="cursor-pointer !list-none !px-4 py-2 break-words hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Select;
