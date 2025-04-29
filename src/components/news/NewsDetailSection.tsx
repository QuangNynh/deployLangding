'use client';
import ChevronDown from '@/assets/icons/chevron-down';
import { Locale } from '@/types/common';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface NewsDetailPageProps {
    content: string;
    isShowToc?: boolean;
}

// Định nghĩa kiểu cho mục TOC (có children để hỗ trợ phân cấp)
interface TocItem {
    id: string;
    text: string;
    level: number;
    children?: TocItem[];
}

const NewsDetailSection = ({ content, isShowToc = true }: NewsDetailPageProps) => {
    const [toc, setToc] = useState<TocItem[]>([]);
    const [updatedContent, setUpdatedContent] = useState<string>(content);
    const containerRef = useRef(null);
    const [openToc, setOpenToc] = useState<boolean>(false);
    const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});
    const params = useParams<{ slug: string; locale: Locale }>();

    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        // Tạo một DOMParser để parse HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(content || '', 'text/html');

        // Lấy tất cả các thẻ tiêu đề (h1, h2, h3, h4, h5, h6)
        const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const tocItems: TocItem[] = [];
        const stack: TocItem[] = []; // Stack để theo dõi cấp độ cha

        headings.forEach((heading, index) => {
            // Gán id cho tiêu đề nếu chưa có
            const id = heading.id || `heading-${index}`;
            heading.id = id;

            // Lấy nội dung tiêu đề
            const text = heading.textContent || '';

            // Xác định cấp độ dựa trên thẻ (h1: level 1, h2: level 2, v.v.)
            const level = parseInt(heading.tagName.replace('H', ''));

            // Tạo mục TOC
            const item: TocItem = { id, text, level, children: [] };

            // Tìm cha phù hợp trong stack
            while (stack.length > 0 && stack[stack.length - 1].level >= level) {
                stack.pop(); // Loại bỏ các mục có cấp độ lớn hơn hoặc bằng
            }

            if (stack.length === 0) {
                // Nếu không có cha, thêm vào danh sách gốc
                tocItems.push(item);
            } else {
                // Thêm vào children của cha gần nhất
                stack[stack.length - 1].children!.push(item);
            }

            // Thêm mục hiện tại vào stack
            stack.push(item);
        });

        // Cập nhật danh mục
        setToc(tocItems);

        // Cập nhật nội dung HTML với các id mới
        setUpdatedContent(doc.body.innerHTML);
    }, [content]);

    // Hàm cuộn mượt đến phần được chọn
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 220; // Khoảng cách từ đỉnh (tùy chỉnh nếu cần)
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };

    // Hàm render TOC dạng nested
    const toggleExpand = (id: string) => {
        setExpandedItems((prev) => ({
            ...prev,
            [id]: !prev[id], // Toggle trạng thái (true -> false, false -> true)
        }));
    };

    // Hàm render TOC với tính năng ẩn/hiển thị
    const renderToc = (items: TocItem[]) => {
        return (
            <ul className="!m-0 list-none space-y-2 !pl-0">
                {items.map((item) => {
                    const isExpanded = expandedItems[item.id] || false; // Mặc định là ẩn (false)

                    return (
                        <li key={item.id} className="m-0 list-none !p-0">
                            <div className="flex items-center gap-2">
                                {/* Nút toggle (hiển thị nếu có children) */}
                                {item.children && item.children.length > 0 && (
                                    <button
                                        onClick={() => toggleExpand(item.id)}
                                        className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                                    >
                                        {isExpanded ? (
                                            <ChevronDown
                                                height={14}
                                                width={14}
                                                className="cursor-pointer duration-200 dark:fill-current dark:text-gray-400"
                                            />
                                        ) : (
                                            <ChevronDown
                                                height={14}
                                                width={14}
                                                className="-rotate-90 cursor-pointer duration-200 dark:fill-current dark:text-gray-400"
                                            />
                                        )}
                                    </button>
                                )}
                                {/* Tiêu đề của mục */}
                                <button
                                    onClick={() => scrollToSection(item.id)}
                                    className={`flex cursor-pointer items-center gap-2 py-1 text-left ${
                                        item.level === 1
                                            ? 'font-bold'
                                            : item.level === 2
                                              ? 'font-semibold'
                                              : item.level === 3
                                                ? 'font-medium'
                                                : 'font-normal' // h4, h5, h6
                                    } dark:text-gray-300`}
                                >
                                    <div className="line-clamp-1 w-full hover:underline">
                                        {item.text}
                                    </div>
                                </button>
                            </div>
                            {/* Hiển thị children nếu isExpanded là true */}
                            {item.children && item.children.length > 0 && (
                                <ul
                                    className={`space-y-2 !pl-4 ${isExpanded ? 'block' : 'hidden'}`}
                                >
                                    {renderToc(item.children)}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
        );
    };

    useEffect(() => {
        if (!isClient || !containerRef.current) return;

        const container = containerRef.current as HTMLDivElement;
        const scripts = container.querySelectorAll('script');

        scripts.forEach((oldScript: any) => {
            const newScript = document.createElement('script');

            // Copy tất cả thuộc tính
            [...oldScript.attributes].forEach((attr) => {
                newScript.setAttribute(attr.name, attr.value);
            });

            newScript.text = oldScript.text || '';
            oldScript.parentNode?.replaceChild(newScript, oldScript);
        });
    }, [updatedContent, isClient]);

    return (
        <div className="mx-auto flex flex-col gap-6">
            {/* Danh mục (TOC) */}
            {toc.length > 0 && isShowToc && (
                <div className="flex w-full flex-col gap-4 self-start rounded-lg bg-white px-4 py-4 dark:bg-gray-800">
                    <div className="flex items-center justify-between gap-2">
                        <h3 className="text-lg font-bold dark:text-white">
                            {' '}
                            {params.locale === 'vi' ? 'Danh mục' : 'Table of Contents'}
                        </h3>
                        <ChevronDown
                            height={18}
                            width={18}
                            onClick={() => setOpenToc(!openToc)}
                            className={`cursor-pointer ${openToc ? 'rotate-180 transform' : ''} duration-200 dark:fill-current dark:text-white`}
                        />
                    </div>
                    {openToc && renderToc(toc)}
                </div>
            )}

            {/* Nội dung bài viết */}
            <div className="no-scrollbar w-full max-w-full overflow-x-auto">
                <style>
                    {`
                
                    .content-wrapper h1,
                    .content-wrapper h2,
                    .content-wrapper h3,
                    .content-wrapper h4,
                    .content-wrapper h5,
                    .content-wrapper h6 {
                        font-size: revert;
                        font-weight: revert;
                        margin: revert;
                        background-color:transparent !important;

                    }
                    .content-wrapper ul {
                        list-style-type: disc;
                        margin: revert;
                        padding-left: 2rem;
                    }
                    .content-wrapper li {
                        margin: revert;
                    }
                    .content-wrapper table {
                        display: table;
                        border-spacing: 2px;
                    }
                    .content-wrapper thead {
                        display: table-header-group;
                    }
                    .content-wrapper tbody {
                        display: table-row-group;
                    }
                    .content-wrapper tr {
                        display: table-row;
                    }
                    .content-wrapper th,
                    .content-wrapper td {
                        display: table-cell;
                        padding: 1px;
                        vertical-align: inherit;
                    }
                    .content-wrapper table,
                    .content-wrapper th,
                    .content-wrapper td {
                        border: 1px solid black;
                    }
                    .content-wrapper .ytp-cued-thumbnail-overlay,
                    .content-wrapper .ytp-cued-thumbnail-overlay-image,
                    .content-wrapper .ytp-large-play-button {
                        max-width: 100%;
                    }
                    .content-wrapper .ytp-cued-thumbnail-overlay-image {
                        background-size: contain;
                        background-repeat: no-repeat;
                    }
                    .content-wrapper iframe {
                        display: block;
                        width: 100%;
                        max-width: 100%;
                        border: 0;
                    }
                    .content-wrapper img {
                        width: 100% !important;
                    }
                     .content-wrapper span {
                        line-height: 130% !important;
                    }
                    .content-wrapper {
                        font-family: "Be Vietnam Pro", sans-serif !important;
                    }
                    .content-wrapper .twitter-tweet.twitter-tweet-rendered{
                        margin:10px auto !important;
                    }
                `}
                </style>
                {isClient && (
                    <div
                        ref={containerRef}
                        className="content-wrapper w-full [&_div]:mt-0 [&_div]:mb-2 [&_figcaption]:mt-1 [&_figcaption]:text-sm [&_figcaption]:text-gray-600 [&_figure]:mb-2 [&_img]:block [&_img]:h-auto [&_img]:max-w-full [&_img]:object-cover [&_p]:mt-0 [&_p]:mb-2 [&_span]:!leading-[140%] [&_table]:w-full [&_table]:max-w-full [&_td]:break-words [&_th]:break-words"
                        dangerouslySetInnerHTML={{ __html: updatedContent }}
                    />
                )}
            </div>
        </div>
    );
};

export default NewsDetailSection;
