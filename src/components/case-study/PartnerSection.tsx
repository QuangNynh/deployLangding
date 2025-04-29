import MarqueeIcon from '../common/MarqueeIcon';

export const PartnerSection = () => {
    const ListImage = [
        '/images/partner-images/partner-image-1.png',
        '/images/partner-images/partner-image-2.png',
        '/images/partner-images/partner-image-3.png',
        '/images/partner-images/partner-image-4.png',
        '/images/partner-images/partner-image-5.png',
        '/images/partner-images/partner-image-6.png',
    ];
    return (
        <div className="flex flex-col items-center gap-9 py-10">
            <MarqueeIcon content={ListImage} />
            <MarqueeIcon content={ListImage} direction="right" />
        </div>
    );
};
