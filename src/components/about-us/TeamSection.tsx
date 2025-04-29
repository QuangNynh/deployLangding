/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface TeamMember {
    name: string;
    position: string;
    image: string;
    animation?: string;
}

export const TeamSection: React.FC = () => {
    const { t } = useTranslation('about');

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
        });
    }, []);

    const teamMembers: TeamMember[] = [
        {
            name: 'Orion Zephyr',
            position: t('team-section.position.development-lead'),
            image: 'https://techcombank.com/content/dam/techcombank/public-site/common/others/mr-saurabh-narayan-agarwal-ce44f9ff5f-abcbda56b3.jpg.rendition/cq5dam.web.1280.1280.jpeg',
            animation: 'fade-up',
        },
        {
            name: t('team-section.position.elera-nyx'),
            position: t('team-section.position.science-director'),
            image: 'https://techcombank.com/content/dam/techcombank/public-site/com_img/Mr-Eugene-Keith-Galbraith.png.rendition/cq5dam.web.1280.1280.png',
            animation: 'fade-up',
        },
        {
            name: 'Selene Astra',
            position: t('team-section.position.marketing-lead'),
            image: 'https://techcombank.com/content/dam/techcombank/public-site/com_img/Mr-Santhosh-Mahendiran.png.rendition/cq5dam.web.1280.1280.png',
            animation: 'fade-up',
        },
    ];

    return (
        <>
            <div
                id="team-section"
                style={{ position: 'relative', top: '-64px', visibility: 'hidden', height: 0 }}
            />
            <section className="mx-auto my-1 py-5 md:py-8 lg:py-12 dark:bg-gray-900">
                <div className="container !px-4">
                    <div className="mb-6 text-center md:mb-8">
                        <h2 className="mb-6 !text-3xl leading-[1.25] font-bold text-[#fe0000] md:!text-5xl md:leading-[1] dark:text-white">
                            {t('team-section.title')}
                        </h2>
                        <p className="mx-auto max-w-3xl text-base leading-[1.5] text-[#2C2C2C] md:text-xl lg:text-2xl dark:text-gray-300">
                            {t('team-section.description')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="overflow-hidden rounded-2xl bg-white dark:bg-gray-800"
                                data-aos={member.animation}
                                data-aos-delay={index * 100}
                            >
                                <div className="relative w-full" style={{ aspectRatio: '7/5' }}>
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        width={420}
                                        height={300}
                                        className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                    ></img>
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="mb-2 text-2xl font-bold text-[#2C2C2C] md:text-xl lg:text-3xl dark:text-white">
                                        {member.name}
                                    </h3>
                                    <p className="text-lg text-[#2C2C2C] md:text-base lg:text-xl dark:text-gray-300">
                                        {member.position}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default TeamSection;
