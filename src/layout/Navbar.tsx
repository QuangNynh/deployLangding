import ChevronDown from "@/assets/icons/chevron-down";
import { ROUTES } from "@/constants/routes";
import { Locale } from "@/types/common";
import { getRoute } from "@/utils/routes";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface MenuItem {
    title: string;
    route?: keyof typeof ROUTES.vi;
    subMenu?: MenuItem[];
  }
  
  const MENU_OPTION: MenuItem[] = [
    { title: "header.menu.home", route: "home" },
    { title: "header.menu.about-us", route: "about-us" },
    { title: "header.menu.technology", route: "technology" },
    {
      title: "header.menu.service-conclusion.title",
      subMenu: [
        { title: "header.menu.service-conclusion.sub-menu.service", route: "technology" },
        { title: "header.menu.service-conclusion.sub-menu.product", route: "technology" },
      ],
    },
    { title: "header.menu.case-study", route: "case-study" },
    {
      title: "header.menu.news.title",
      subMenu: [
        { title: "header.menu.news.sub-menu.news", route: "news" },
        { title: "header.menu.news.sub-menu.recruitment", route: "news" },
      ],
    },
    { title: "header.menu.contact", route: "contact" },
  ];


interface Props {
    locale: Locale;
  }

const Navbar: React.FC<Props> = ({ locale }) => {
    const { t } = useTranslation('layout');

  return (
    <nav className="hidden lg:block">
      <ul className="flex space-x-4 font-medium">
        {MENU_OPTION.map((menu, index) => (
          <li key={index} className={menu.subMenu ? "group relative" : ""}>
            {menu.subMenu ? (
              <>
                <div className="flex items-center gap-[6px]">
                  {t(menu.title)}
                  <div className="duration-300 group-hover:rotate-180">
                    <ChevronDown width={12} height={12} />
                  </div>
                </div>
                <ul className="absolute top-8 left-1/2 flex h-0 origin-top -translate-x-1/2 scale-y-0 transform-gpu flex-col gap-5 overflow-hidden rounded-[20px] bg-white p-0 text-nowrap opacity-0 duration-300 group-hover:h-[108px] group-hover:scale-y-100 group-hover:p-5 group-hover:opacity-100">
                  {menu.subMenu.map((sub, subIndex) => (
                    <li key={subIndex}>
                      <Link href={getRoute(sub.route!, locale)}>
                        {t(sub.title)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Link href={getRoute(menu.route!, locale)}>{t(menu.title)}</Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
