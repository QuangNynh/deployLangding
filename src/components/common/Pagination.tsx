import ChevronLeft from '@/assets/icons/chevron-left';
import ChevronRight from '@/assets/icons/chevron-right';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

const Pagination = ({ currentPage, totalPages, onPageChange, className }: PaginationProps) => {
    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`h-11 w-11 rounded-full text-sm font-medium transition-colors ${
                        currentPage === i
                            ? 'bg-gradient-to-r from-[#FF4D4D] to-[#CC0000] text-white'
                            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    } `}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className={`flex items-center justify-center gap-2 ${className} `}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-300 dark:hover:bg-gray-700 dark:disabled:opacity-30"
            >
                <ChevronLeft className="dark:fill-current dark:text-gray-300" />
            </button>
            {renderPageNumbers()}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={
                    'flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-300 dark:hover:bg-gray-700 dark:disabled:opacity-30'
                }
            >
                <ChevronRight className="dark:fill-current dark:text-gray-300" />
            </button>
        </div>
    );
};

export default Pagination;
