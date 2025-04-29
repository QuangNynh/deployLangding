export const SkeletonCard = () => {
    return (
        <div className="flex animate-pulse flex-col items-start gap-9 rounded-2xl bg-white p-[18px] shadow-lg dark:bg-gray-800">
            <div className="flex w-full flex-col gap-2">
                <div className="h-[30px] w-3/4 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-[24px] w-1/2 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <div className="h-[41px] w-[120px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
    );
};
