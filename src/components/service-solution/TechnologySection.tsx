import { useTranslation } from 'react-i18next';
import DatabaseIcon from '@/assets/icons/database-icon';
import CloudIcon from '@/assets/icons/cloud-icon';
import AiIcon from '@/assets/icons/ai-icon';
import MultiPlatformIcon from '@/assets/icons/multi-platformIcon-icon';
import AOS from 'aos';
import { useEffect } from 'react';

const techItems = [
    {
        key: 'ai_ml',
        icon: <AiIcon />,
    },
    {
        key: 'big_data',
        icon: <DatabaseIcon />,
    },
    {
        key: 'multi_platform',
        icon: <MultiPlatformIcon />,
    },
    {
        key: 'cloud_it',
        icon: <CloudIcon />,
    },
];

export const TechnologySection = () => {
    const { t } = useTranslation('service-solution');

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
        });
    }, []);

    return (
        <section className="py-6 md:py-[52px] dark:bg-gray-900">
            <div className="grid gap-[50px] md:grid-cols-2 lg:grid-cols-4">
                {techItems.map((item) => (
                    <div key={item.key} className="flex flex-col gap-[28px]" data-aos="fade-up">
                        {item.icon}
                        <span className="text-2xl font-medium dark:text-white">
                            {t(`technology-section.${item.key}.title`)}
                        </span>
                        <span className="dark:text-gray-300">
                            {t(`technology-section.${item.key}.description`)}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};
