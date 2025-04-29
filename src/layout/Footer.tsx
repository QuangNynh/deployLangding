'use client';
import FacebookIcon from '@/assets/icons/facebook-icon';
import InstagramIcon from '@/assets/icons/instagram-icon';
import ZaloIcon from '@/assets/icons/zalo-icon';
import LogoKatech from '@/assets/images/logo-katech';
import { ROUTES } from '@/constants/routes';
import { companyInfoService } from '@/services/companyInfoService';
import { Locale } from '@/types/common';
import { getRoute } from '@/utils/routes';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation('layout');
    const params = useParams<{ locale: string }>();
    const pathname = usePathname();

    // Function to check if a route is active (similar to Header component)
    const isActive = (route: keyof typeof ROUTES.vi) => {
        const fullRoute = getRoute(route, params.locale as Locale);
        return pathname === fullRoute;
    };
    const { data: dataCompany } = useQuery({
        queryKey: ['serviceCompany'],
        queryFn: () => companyInfoService.getCompanyInfo(params.locale),
    });

    return (
        <footer className="flex w-full flex-col gap-8 dark:bg-gray-900 dark:text-white">
            <div className="flex w-full flex-col gap-1">
                <div className="mx-auto h-[2px] w-full bg-gray-200 dark:bg-gray-700"></div>
                {/* <div className='h-[4px] w-full mx-auto bg-[red]'></div>
            <div className='h-[8px] w-full mx-auto bg-[red]'></div> */}
            </div>
            <div className="container">
                <div className="grid grid-cols-12 gap-6 text-[13px] md:gap-[52px]">
                    <div className="col-span-12 flex flex-col items-center gap-2 text-center lg:col-span-6 lg:items-start lg:text-left">
                        <LogoKatech className="h-28 w-28" />
                        <div className="flex flex-col gap-2">
                            <span>{dataCompany?.companyName}</span>
                            <span>{t('footer.license')}</span>
                            <span>{t('footer.authority')}</span>
                        </div>
                        <div className="mt-4 flex gap-4">
                            <a
                                href={dataCompany?.facebookLink || 'https://www.facebook.com/'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                            >
                                <FacebookIcon className="h-8 w-8" />
                            </a>
                            <a
                                href={dataCompany?.instagramLink || 'https://www.instagram.com/'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-400"
                            >
                                <InstagramIcon className="h-8 w-8" />
                            </a>
                            <a
                                href={dataCompany?.zaloLink || 'https://zalo.me/'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                            >
                                <ZaloIcon className="h-8 w-8" />
                            </a>
                        </div>
                    </div>
                    <div className="col-span-12 flex flex-col gap-[10px] md:col-span-4 lg:col-span-2">
                        <span className="font-semibold">{t('footer.links.title')}</span>
                        <ul className="!m-0 flex !list-none flex-col gap-[10px] !p-0">
                            <li>
                                <Link
                                    href={getRoute('/', params.locale as Locale)}
                                    className={`hover:text-[#CC0000] dark:text-white dark:hover:text-[#FF6B6B] ${
                                        isActive('/') ? 'text-[#CC0000] dark:text-[#FF6B6B]' : ''
                                    }`}
                                >
                                    {t('footer.links.home')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={getRoute('about-us', params.locale as Locale)}
                                    className={`hover:text-[#CC0000] dark:text-white dark:hover:text-[#FF6B6B] ${
                                        isActive('about-us')
                                            ? 'text-[#CC0000] dark:text-[#FF6B6B]'
                                            : ''
                                    }`}
                                >
                                    {t('footer.links.about')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={getRoute('service-solution', params.locale as Locale)}
                                    className={`hover:text-[#CC0000] dark:text-white dark:hover:text-[#FF6B6B] ${
                                        isActive('service-solution')
                                            ? 'text-[#CC0000] dark:text-[#FF6B6B]'
                                            : ''
                                    }`}
                                >
                                    {t('footer.links.services')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={getRoute('case-study', params.locale as Locale)}
                                    className={`hover:text-[#CC0000] dark:text-white dark:hover:text-[#FF6B6B] ${
                                        isActive('case-study')
                                            ? 'text-[#CC0000] dark:text-[#FF6B6B]'
                                            : ''
                                    }`}
                                >
                                    {t('footer.links.case-study')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={getRoute('news', params.locale as Locale)}
                                    className={`hover:text-[#CC0000] dark:text-white dark:hover:text-[#FF6B6B] ${
                                        isActive('news') ? 'text-[#CC0000] dark:text-[#FF6B6B]' : ''
                                    }`}
                                >
                                    {t('footer.links.news')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={getRoute('contact', params.locale as Locale)}
                                    className={`hover:text-[#CC0000] dark:text-white dark:hover:text-[#FF6B6B] ${
                                        isActive('contact')
                                            ? 'text-[#CC0000] dark:text-[#FF6B6B]'
                                            : ''
                                    }`}
                                >
                                    {t('footer.links.contact')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={getRoute('recruitment', params.locale as Locale)}
                                    className={`hover:text-[#CC0000] dark:text-white dark:hover:text-[#FF6B6B] ${
                                        isActive('recruitment')
                                            ? 'text-[#CC0000] dark:text-[#FF6B6B]'
                                            : ''
                                    }`}
                                >
                                    {t('footer.links.recruitment')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-12 flex flex-col gap-[10px] md:col-span-8 lg:col-span-4">
                        <span className="font-semibold">{t('footer.contact.title')}</span>
                        <div className="flex flex-col gap-[10px]">
                            <span>{dataCompany?.address}</span>
                            <a
                                href={`tel:${dataCompany?.hotline}`}
                                className="hover:text-[#CC0000] dark:text-white dark:hover:text-[#FF6B6B]"
                            >
                                {dataCompany?.hotline}
                            </a>
                            <a
                                href={`mailto:${dataCompany?.email}`}
                                className="hover:text-[#CC0000] dark:text-white dark:hover:text-[#FF6B6B]"
                            >
                                {dataCompany?.email}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-[#D6D6D67A] py-4 text-center leading-[150%] dark:border-gray-700 text-sm">
                <div className="container">{t('footer.copyright')}</div>
            </div>
        </footer>
    );
};

export default Footer;
