'use client';

import LocationIcon from '@/assets/icons/location-icon';
import MoneyIcon from '@/assets/icons/money-icon';
import RobotIcon from '@/assets/icons/robot-icon';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ContactForm } from './ContactForm';

export const ContactSection = () => {
    const { t } = useTranslation('contact');

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
        });
    }, []);

    return (
        <section className="pt-13 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 items-center gap-13 lg:grid-cols-2">
                    {/* Thông tin liên hệ */}
                    <div className="space-y-8">
                        {[
                            {
                                icon: <RobotIcon />,
                                title: t('contact-info.chatbot.title'),
                                description: t('contact-info.chatbot.description'),
                                animation: 'zoom-in-down',
                            },
                            {
                                icon: <MoneyIcon />,
                                title: t('contact-info.pricing.title'),
                                description: t('contact-info.pricing.description'),
                                animation: 'fade-up',
                            },
                            {
                                icon: <LocationIcon />,
                                title: t('contact-info.headquarters.title'),
                                description: t('contact-info.headquarters.description'),
                                animation: 'zoom-in-up',
                            },
                        ].map(({ icon, title, description, animation }, index) => (
                            <div
                                key={index}
                                className="flex min-h-[152px] w-full space-x-6 rounded-[22px] bg-white px-6 py-10 shadow-lg dark:bg-gray-800"
                                data-aos={animation}
                                data-aos-delay={index * 100}
                            >
                                <div className="text-4xl text-red-500">{icon}</div>
                                <div>
                                    <h3 className="text-2xl leading-9 font-bold text-[#2C2C2C] hover:text-red-500 dark:text-white dark:hover:text-red-400">
                                        {title}
                                    </h3>
                                    <p className="text-lg leading-[28px] whitespace-pre-line text-[#2C2C2C] dark:text-gray-300"   dangerouslySetInnerHTML={{ __html: description }}/>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Form liên hệ */}
                    <div data-aos="fade-up">
                        <ContactForm />
                    </div>
                </div>

                {/* Bản đồ */}
                <div
                    className="relative mt-13 rounded-[22px] bg-gray-100 text-center dark:bg-gray-700"
                    data-aos="fade-up"
                >
                    <iframe
                        width="100%"
                        height="600"
                        style={{ border: 0, overflow: 'hidden' }}
                        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=24%20P.%20Nguy%E1%BB%85n%20C%C6%A1%20Th%E1%BA%A1ch,%20M%E1%BB%B9%20%C4%90%C3%ACnh,%20Nam%20T%E1%BB%AB%20Li%C3%AAm,%20H%C3%A0%20N%E1%BB%99i+(C%C3%94NG%20TY%20C%E1%BB%94%20PH%E1%BA%A6N%20C%C3%94NG%20NGH%E1%BB%86%20V%C3%80%20D%E1%BB%8ACH%20V%E1%BB%A4%20KATECH%20-%20VI%E1%BB%86T%20NAM)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    >
                        <a href="https://www.gps.ie/collections/drones/">drone quadcopter</a>
                    </iframe>
                </div>
            </div>
        </section>
    );
};
