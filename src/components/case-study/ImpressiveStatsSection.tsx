'use client';

import SatisfactionIcon from '@/assets/icons/satisfaction-icon';
import ProjectIcon from '@/assets/icons/project-icon';
import AwardIcon from '@/assets/icons/award-icon';
import GlobalIcon from '@/assets/icons/global-icon';
import { useTranslation } from 'react-i18next';
import AnimatedNumbers from 'react-animated-numbers';
import { JSX } from 'react';

interface StatItemProps {
    icon: JSX.Element;
    value: string;
    description: string;
}

const StatItem = ({ icon, value, description }: StatItemProps) => {
    const numericValue = parseInt(value.replace(/\D/g, ''));
    const hasPlus = value.includes('+');
    const isPercentage = value.includes('%');

    return (
        <div className="flex flex-col rounded-[22px] bg-white p-10 dark:bg-gray-800">
            <div className="mb-8 h-16 w-16">{icon}</div>
            <div className="mb-4 -ml-0.5 flex items-center">
                {!isNaN(numericValue) ? (
                    <AnimatedNumbers
                        includeComma
                        animateToNumber={numericValue}
                        fontStyle={{
                            fontSize: 60,
                            fontWeight: 'bold',
                            color: '#EF4444',
                            lineHeight: '60px',
                            width: '42px',
                            textAlign: 'center',
                        }}
                        transitions={(index) => ({
                            type: 'tween',
                            duration: index + 3,
                        })}
                        key={`animated-number-${numericValue}`}
                    />
                ) : (
                    <h3 className="text-2xl font-bold text-red-500 max-md:text-lg">{value}</h3>
                )}
                {hasPlus && <span className="text-6xl font-bold text-red-500">+</span>}
                {isPercentage && <span className="text-6xl font-bold text-red-500">%</span>}
            </div>
            <p className="text-2xl text-[#2C2C2C] dark:text-gray-300">{description}</p>
        </div>
    );
};

export const ImpressiveStatsSection = () => {
    const { t } = useTranslation('home');

    const statsData = [
        {
            icon: <ProjectIcon />,
            value: '50+',
            description: t('stats.projects'),
        },
        {
            icon: <SatisfactionIcon />,
            value: '95%',
            description: t('stats.satisfaction'),
        },
        {
            icon: <AwardIcon />,
            value: '30+',
            description: t('stats.awards'),
        },
        {
            icon: <GlobalIcon />,
            value: '5',
            description: t('stats.countries'),
        },
    ];

    return (
        <div className="">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {statsData.map((stat, index) => (
                    <StatItem
                        key={index}
                        icon={stat.icon}
                        value={stat.value}
                        description={stat.description}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImpressiveStatsSection;
