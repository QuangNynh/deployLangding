// components/MultiSelect.tsx
import React, { useState, useRef, useEffect } from 'react';

interface Option {
    value: string;
    label: string;
}

interface MultiSelectProps {
    options: Option[];
    value: string[]; // Giá trị được truyền từ bên ngoài (react-hook-form)
    onChange: (selected: string[]) => void;
    placeholder?: string;
    className?: string;
    placeholderNoptions?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
    options,
    value,
    onChange,
    placeholder = 'Chọn các mục...',
    className = '',
    placeholderNoptions = 'Không có mục nào',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Đóng dropdown khi click bên ngoài
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggleOption = (selectedValue: string) => {
        const newSelectedValues = value.includes(selectedValue)
            ? value.filter((v) => v !== selectedValue)
            : [...value, selectedValue];

        onChange(newSelectedValues);
    };

    const handleRemoveOption = (selectedValue: string) => {
        const newSelectedValues = value.filter((v) => v !== selectedValue);
        onChange(newSelectedValues);
    };

    const selectedLabels = value.map(
        (selectedValue) => options.find((option) => option.value === selectedValue)?.label || ''
    );

    return (
        <div className={`relative ${className}`} ref={wrapperRef}>
            <div
                className="flex min-h-[48px] w-full cursor-pointer flex-wrap items-center gap-2 rounded-[22px] border border-[#D6D6D6] bg-white px-3 py-2 focus:outline-none dark:border-gray-600 dark:bg-gray-800"
                onClick={() => setIsOpen(!isOpen)}
            >
                {value.length > 0 ? (
                    selectedLabels.map((label, index) => (
                        <span
                            key={value[index]}
                            className="inline-flex items-center rounded-full bg-gray-100 px-2 text-sm dark:bg-gray-700 dark:text-gray-200"
                        >
                            {label}
                            <div
                                className="ml-2 cursor-pointer p-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveOption(value[index]);
                                }}
                            >
                                <svg
                                    className="h-3 w-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </div>
                        </span>
                    ))
                ) : (
                    <span className="text-gray-400 dark:text-gray-400">{placeholder}</span>
                )}
            </div>

            {isOpen && (
                <div className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                    {options.length === 0 ? (
                        <div className="px-4 py-2 text-gray-500 dark:text-gray-400">
                            {placeholderNoptions}
                        </div>
                    ) : (
                        options.map((option) => (
                            <div
                                key={option.value}
                                className={`cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                    value.includes(option.value)
                                        ? 'bg-gray-100 dark:bg-gray-700'
                                        : ''
                                }`}
                                onClick={() => handleToggleOption(option.value)}
                            >
                                <span className="dark:text-white">{option.label}</span>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default MultiSelect;
