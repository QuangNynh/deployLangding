'use client';
import ChevronDown from '@/assets/icons/chevron-down';
import FlagEn from '@/assets/icons/flag-en';
import FlagVn from '@/assets/icons/flag-vn';
import MenuIcon from '@/assets/icons/menu';
import LogoKatech from '@/assets/images/logo-katech';
import { ROUTES } from '@/constants/routes';
import { useClickOutside } from '@/hooks/useClickOutside';
import { Locale } from '@/types/common';
import { getRoute, switchLanguage } from '@/utils/routes';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface MenuItem {
    id: string;
    title: string;
    route?: keyof typeof ROUTES.vi;
    subMenu?: MenuItem[];
}

const MENU_OPTION: MenuItem[] = [
    { id: 'home', title: 'header.menu.home', route: '/' },
    { id: 'about-us', title: 'header.menu.about-us', route: 'about-us' },
    {
        id: 'service-conclusion',
        title: 'header.menu.service-conclusion.title',
        route: 'service-solution',
    },
    { id: 'case-study', title: 'header.menu.case-study', route: 'case-study' },
    { id: 'news', title: 'header.menu.news.title', route: 'news' },
    { id: 'contact', title: 'header.menu.contact', route: 'contact' },
    {
        id: 'recruitment',
        title: 'header.menu.news.sub-menu.recruitment',
        route: 'recruitment',
    },
];

export const Header = () => {
    const { t } = useTranslation('layout');
    const { t: tCommon } = useTranslation('common');
    const params = useParams<{ locale: string }>();
    const pathname = usePathname();
    const { push } = useRouter();
    const [isLangOpen, setIsLangOpen] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [subMenuOpen, setSubMenuOpen] = useState<string | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);

    const langRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useClickOutside(langRef, () => setIsLangOpen(false));
    useClickOutside(menuRef, () => setIsMenuOpen(false));

    const toggleSubMenu = (id: string) => {
        setSubMenuOpen((prevId) => (prevId === id ? null : id));
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            setIsMenuOpen(false);
            setIsLangOpen(false);
            setSubMenuOpen(null);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (route: keyof typeof ROUTES.vi) => {
        const fullRoute = getRoute(route, params.locale as Locale);
        return pathname === fullRoute;
    };

    const handleLanguageChange = (newLocale: 'vi' | 'en') => {
        setIsLangOpen(false);
        switchLanguage(push, pathname, newLocale);
    };

    return (
        <header
            className={`sticky top-0 z-[200] transition-all duration-300 ${
                isScrolled
                    ? 'bg-white/50 shadow-md backdrop-blur-md dark:bg-gray-900/50'
                    : 'bg-white dark:bg-gray-900'
            }`}
        >
            <div className="container">
                <div className="flex items-center justify-between py-4">
                    <Link href={getRoute('/', params.locale as Locale)}>
                        <LogoKatech />
                    </Link>
                    <nav className="hidden lg:block">
                        <ul className="!m-0 flex space-x-4 !pl-0 font-medium">
                            {MENU_OPTION.map((menu, index) => (
                                <li
                                    key={index}
                                    className={`!list-none px-2 ${menu.subMenu ? 'group relative' : ''}`}
                                >
                                    {menu.subMenu ? (
                                        <>
                                            <div className="flex items-center gap-[6px] hover:text-[#CC0000] dark:text-white">
                                                {t(menu.title)}
                                                <div className="duration-300 group-hover:rotate-180">
                                                    <ChevronDown width={12} height={12} />
                                                </div>
                                            </div>
                                            <div className="absolute top-full h-10 w-full"></div>
                                            <ul className="absolute top-8 left-1/2 flex h-0 origin-top -translate-x-1/2 scale-y-0 transform-gpu flex-col gap-5 overflow-hidden rounded-[20px] bg-white p-0 text-nowrap opacity-0 duration-300 group-hover:h-[108px] group-hover:scale-y-100 group-hover:p-5 group-hover:opacity-100 dark:bg-gray-800">
                                                {menu.subMenu.map((sub, subIndex) => (
                                                    <li key={subIndex}>
                                                        <Link
                                                            className={`hover:text-[#CC0000] dark:text-white dark:hover:text-[#FF6B6B] ${
                                                                isActive(sub.route!)
                                                                    ? '!dark:text-[#FF6B6B] text-[#CC0000]'
                                                                    : ''
                                                            }`}
                                                            href={getRoute(
                                                                sub.route!,
                                                                params.locale as Locale
                                                            )}
                                                            prefetch
                                                        >
                                                            {t(sub.title)}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    ) : (
                                        <Link
                                            href={getRoute(menu.route!, params.locale as Locale)}
                                            className={`hover:text-[#CC0000] dark:text-white dark:hover:text-[#FF6B6B] ${
                                                isActive(menu.route!)
                                                    ? 'text-[#CC0000] dark:!text-[#FF6B6B]'
                                                    : ''
                                            }`}
                                            prefetch
                                        >
                                            {t(menu.title)}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="flex items-center gap-4">
                        <div className="group relative" ref={langRef}>
                            <div
                                className="flex cursor-pointer items-center gap-[6px]"
                                onClick={() => setIsLangOpen(!isLangOpen)}
                            >
                                <div>{params.locale === 'vi' ? <FlagVn /> : <FlagEn />}</div>
                            </div>
                            <div
                                className={`absolute top-8 right-0 !m-0 flex h-0 origin-top-right scale-y-0 transform-gpu !list-none flex-col gap-5 overflow-hidden rounded-[20px] bg-white p-0 text-nowrap opacity-0 duration-300 group-hover:h-[108px] group-hover:scale-y-100 group-hover:p-5 group-hover:opacity-100 dark:bg-gray-800 ${
                                    isLangOpen ? 'h-auto scale-y-100 p-5 opacity-100' : ''
                                }`}
                            >
                                <li className="!list-none pl-0">
                                    <div
                                        className="flex cursor-pointer items-center gap-5 font-medium dark:text-white"
                                        onClick={() => handleLanguageChange('vi')}
                                    >
                                        <FlagVn />
                                        {tCommon('vietnamese')}
                                    </div>
                                </li>
                                <li className="!list-none pl-0">
                                    <div
                                        className="flex cursor-pointer items-center gap-5 font-medium dark:text-white"
                                        onClick={() => handleLanguageChange('en')}
                                    >
                                        <FlagEn />
                                        {tCommon('english')}
                                    </div>
                                </li>
                            </div>
                        </div>
                        <div className="group relative lg:hidden" ref={menuRef}>
                            <div
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="cursor-pointer"
                            >
                                <MenuIcon />
                            </div>
                            <div
                                className={`absolute top-8 right-0 !m-0 flex h-0 origin-top-right scale-y-0 transform-gpu flex-col gap-4 overflow-hidden rounded-[20px] bg-white p-0 text-nowrap opacity-0 duration-300 dark:bg-gray-800 ${
                                    isMenuOpen ? 'h-auto scale-y-100 p-5 opacity-100' : ''
                                }`}
                            >
                                {MENU_OPTION.map((menu, index) => (
                                    <li
                                        key={index}
                                        className={`!list-none font-bold ${menu.subMenu ? 'group relative' : ''}`}
                                    >
                                        {menu.subMenu ? (
                                            <>
                                                <div
                                                    className={`flex items-center gap-[6px] dark:text-white ${
                                                        subMenuOpen === menu.id
                                                            ? 'text-[#CC0000] dark:text-[#FF6B6B]'
                                                            : ''
                                                    }`}
                                                    onClick={() => toggleSubMenu(menu.id)}
                                                >
                                                    <span className="font-bold">
                                                        {t(menu.title)}
                                                    </span>
                                                    <div
                                                        className={`duration-300 ${
                                                            subMenuOpen === menu.id
                                                                ? 'rotate-180'
                                                                : ''
                                                        }`}
                                                    >
                                                        <ChevronDown width={12} height={12} />
                                                    </div>
                                                </div>
                                                <ul
                                                    className={`pl-3 ${
                                                        subMenuOpen === menu.id ? 'h-auto' : 'h-0'
                                                    } !m-0 !list-none overflow-hidden duration-300`}
                                                >
                                                    {menu.subMenu.map((sub, subIndex) => (
                                                        <li
                                                            key={subIndex}
                                                            className="!list-none pt-3 font-normal"
                                                        >
                                                            <Link
                                                                href={getRoute(
                                                                    sub.route!,
                                                                    params.locale as Locale
                                                                )}
                                                                className={`hover:text-[#CC0000] dark:text-white dark:hover:text-[#FF6B6B] ${
                                                                    isActive(sub.route!)
                                                                        ? 'text-[#CC0000] dark:text-[#FF6B6B]'
                                                                        : ''
                                                                }`}
                                                                prefetch
                                                            >
                                                                {t(sub.title)}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        ) : (
                                            <Link
                                                href={getRoute(
                                                    menu.route!,
                                                    params.locale as Locale
                                                )}
                                                className={`hover:text-[#CC0000] dark:text-white dark:hover:text-[#FF6B6B] ${
                                                    isActive(menu.route!)
                                                        ? 'text-[#CC0000] dark:text-[#FF6B6B]'
                                                        : ''
                                                }`}
                                                prefetch
                                            >
                                                {t(menu.title)}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
