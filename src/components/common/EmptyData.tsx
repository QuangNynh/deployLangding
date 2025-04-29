import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const EmptyData = () => {
    const { t } = useTranslation('common');
    return (
        <div className="flex w-full flex-col items-center justify-center gap-4 py-10">
            <Image
                src="/images/empty-data.svg"
                alt="No Data"
                width={200}
                height={200}
                className="dark:opacity-70"
            />
            <p className="text-lg text-[#2C2C2C] dark:text-gray-300">{t('no-data')}</p>
        </div>
    );
};

export default EmptyData;
