import React from 'react';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';

interface ImageMarqueeIconProps {
    content: string[];
    direction?: 'left' | 'right' | 'up' | 'down';
}

const MarqueeIcon: React.FC<ImageMarqueeIconProps> = ({ content, direction = 'left' }) => {
    return (
        <Marquee
            direction={direction}
            speed={50}
            pauseOnClick
            gradientColor="var(--gradient-color)"
            gradient
            className="dark:bg-gray-900"
        >
            {content.map((content, index) => (
                <div key={index} className="my-3 px-6">
                    <Image
                        src={content}
                        alt="marquee-icon"
                        width={150}
                        height={80}
                        className="h-[40px] w-full object-cover dark:brightness-[0.85] dark:contrast-[1.2] dark:invert-[0.15]"
                    />
                </div>
            ))}
        </Marquee>
    );
};

export default MarqueeIcon;
