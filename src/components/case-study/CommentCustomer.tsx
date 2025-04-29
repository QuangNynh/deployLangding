'use client';

import { Locale } from '@/types/common';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Marquee from 'react-fast-marquee';
import { useTranslation } from 'react-i18next';

const testimonials = {
    vi: [
        {
            position: 'Doanh nghiệp',
            company: 'Tập đoàn Thương Mại Số Á',
            avatar: '/images/mock-testimonial-avatars/mock-testimonial-avatar-2.jpg',
            testimonial:
                'Số Á ấn tượng với chiến lược tư vấn toàn diện của Katech - Việt Nam. Nhờ giải pháp số hóa và tối ưu hóa quy trình nội bộ, chúng tôi đã đạt được bước đột phá rõ rệt trong thời kỳ chuyển đổi số. Dịch vụ tư vấn của các bạn không chỉ chuyên sâu mà còn mang tính đột phá chiến lược, giúp chúng tôi tự tin bước vào kỷ nguyên số.',
        },
        {
            position: 'CEO',
            company: 'THANG LONG CENTRAL CO., LTD (TLC AVIATION)',
            avatar: '/images/mock-testimonial-avatars/mock-testimonial-avatar-1.png',
            testimonial:
                'Tôi đặc biệt ấn tượng với cách thức Katech tiếp cận trong quá trình tư vấn giải pháp. Từ phát triển phần mềm đến giải pháp hạ tầng, mọi khía cạnh đều được cân nhắc và thiết kế theo lộ trình phát triển dài hạn, giúp TLC nắm bắt xu hướng công nghệ và tạo nên những bước tiến chiến lược trong công việc.',
        },
        {
            position: 'Giám đốc',
            company: 'CMC Consulting',
            avatar: '/images/mock-testimonial-avatars/mock-testimonial-avatar-4.png',
            testimonial:
                'Katech - Việt Nam là đối tác tin cậy trong quá trình hợp tác xây dựng phần mềm SAP. Chúng tôi đánh giá cao sự chuyên nghiệp của đội ngũ Katech, hy vọng chúng ta  sẽ có nhiều lần hợp tác hiệu quả hơn trong tương lai ',
        },
        {
            position: 'Giám đốc',
            company: 'Công ty Máy tính Minh Châu',
            avatar: '/images/mock-testimonial-avatars/mock-testimonial-avatar-3.png',
            testimonial:
                'Chất lượng dịch vụ tư vấn và triển khai dự án của Katech thật sự vượt trội. Giải pháp bảo mật phần mềm đã giúp tập đoàn của chúng tôi cải thiện hiệu quả hoạt động đồng thời định hướng chiến lược phát triển bền vững.',
        },
    ],
    en: [
        {
            position: 'Enterprise',
            company: 'Asia Digital Trade Group',
            avatar: '/images/mock-testimonial-avatars/mock-testimonial-avatar-2.png',
            testimonial:
                'Asia Digital Trade Group is impressed with Katech - Vietnam’s comprehensive consulting strategy. Thanks to their digitalization and internal process optimization solutions, we achieved a significant breakthrough during our digital transformation phase. Their consulting services are not only in-depth but also strategically innovative, empowering us to confidently step into the digital era.',
        },
        {
            position: 'CEO',
            company: 'THANG LONG CENTRAL CO., LTD (TLC AVIATION)',
            avatar: '/images/mock-testimonial-avatars/mock-testimonial-avatar-1.png',
            testimonial:
                'I’m particularly impressed with Katech’s approach to consulting. From software development to infrastructure solutions, every aspect was carefully considered and designed with a long-term development roadmap. This has helped TLC stay ahead of technology trends and make strategic advancements in our operations.',
        },
        {
            position: 'Director',
            company: 'CMC Consulting',
            avatar: '/images/mock-testimonial-avatars/mock-testimonial-avatar-4.jpg',
            testimonial:
                'Katech - Vietnam is a trusted partner in our collaboration to build SAP software. We highly appreciate their team’s professionalism and look forward to more successful partnerships in the future.',
        },
        {
            position: 'Director',
            company: 'Minh Chau Computer Company',
            avatar: '/images/mock-testimonial-avatars/mock-testimonial-avatar-3.png',
            testimonial:
                'The quality of Katech’s consulting and project implementation services is truly outstanding. Their software security solution has helped our corporation improve operational efficiency while strategically steering us toward sustainable development.',
        },
    ],
};

interface TestimonialCardProps {
    position: string;
    company: string;
    avatar: string;
    testimonial: string;
}

const TestimonialCard = ({ position, company, avatar, testimonial }: TestimonialCardProps) => {
    return (
        <div className="flex h-full max-w-[300px] flex-col rounded-xl bg-white py-9 pr-6 pl-4 shadow-md dark:bg-gray-800">
            <div className="flex flex-grow gap-3">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative aspect-square w-14">
                        <Image
                            src={avatar}
                            alt={position}
                            fill
                            className="rounded-full border-1 object-cover shadow-sm"
                        />
                    </div>
                    <div className="h-full w-[2px] bg-[#D6D6D67A] dark:bg-gray-600"></div>
                </div>

                <div className="flex flex-grow flex-col items-start gap-6">
                    <div>
                        <p className="text-base font-bold text-[#2C2C2C] dark:text-white">
                            {position}
                        </p>
                        <p className="text-sm text-[#998D8D] dark:text-gray-400">
                            <span>{company}</span>
                        </p>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{testimonial}</p>
                </div>
            </div>
        </div>
    );
};

export const CommentCustomer = () => {
    const { t } = useTranslation('case-study');
    const { locale = 'vi' } = useParams<{ slug: string; locale: Locale }>();

    return (
        <div className="flex flex-col items-center gap-9 py-10 dark:bg-gray-900">
            <h2 className="text-center !text-[48px] leading-[100%] font-bold tracking-[0%] text-[#fe0000] max-md:!text-[30px] dark:text-white">
                {t('comment-customer.title')}
            </h2>
            <Marquee direction={'left'} speed={50} pauseOnClick className="dark:bg-gray-900">
                <div className="flex items-stretch">
                    {testimonials[locale]?.map((item, index) => (
                        <div key={index} className="mr-9 flex items-stretch py-2">
                            <TestimonialCard
                                position={item.position}
                                company={item.company}
                                avatar={item.avatar}
                                testimonial={item.testimonial}
                            />
                        </div>
                    ))}
                </div>
            </Marquee>
        </div>
    );
};
